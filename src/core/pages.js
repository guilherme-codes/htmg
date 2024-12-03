import path from 'path'
import fs from 'fs'
import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import { Transform } from 'stream'
import { extractMarkdownMetadata, markdownToHtml, injectMarkdownMetadata } from '../utils/markdown.js'
import { outputDir, pagesDir } from '../utils/contants.js'
import * as log from '../log/index.js'
import { pageContentRegex } from '../utils/regex.js'
import { minifyHtml } from '../utils/minify.js'

/**
 * Convert markdown pages to html files and add its content to the provided layouts.
 * Maintains directory structure when processing files.
 * 
 * @param {Object} layouts - An object where the key is the layout name and the value is the layout content.
 * @returns {Promise<void>} - A promise that resolves when all files are processed.
 */
export async function buildPages(layouts) {
  try {
    await ensureOutputDirExists()
    const files = await getAllMarkdownFiles(pagesDir)

    for (const file of files) {
      await processFile(file, layouts)
    }

    log.buildSuccess()
  } catch (error) {
    log.compileMarkdownFilesError(error)
  }
}

/**
 * Recursively gets all markdown files from a directory and its subdirectories
 * 
 * @param {string} directory - The root directory to search for markdown files
 * @returns {Promise<string[]>} - Array of relative paths to markdown files
 */
async function getAllMarkdownFiles(directory) {
  const pages = await traverse(directory, directory)

  return pages
}

/**
 * Recursively traverses a directory and returns an array of relative paths to all Markdown files.
 * @param {string} dir - The directory to traverse.
 * @param {string} baseDir - The base directory to calculate relative paths.
 * @returns {Promise<string[]>} - A promise that resolves to an array of relative paths to all Markdown files.
 */
async function traverse(dir, baseDir) {
  const files = await fs.promises.readdir(dir, { withFileTypes: true })
  const allFiles = []

  for (const file of files) {
    const fullPath = path.join(dir, file.name)
    const relativePath = path.relative(baseDir, fullPath)

    if (file.isDirectory()) {
      await traverse(fullPath, baseDir)
    } else if (path.extname(file.name) === '.md') {
      allFiles.push(relativePath)
    }
  }

  return allFiles
}


/**
 * Process a single markdown file and convert it to HTML
 * Maintains the original directory structure in the output
 * 
 * @param {string} file - The relative path to the markdown file from pagesDir
 * @param {Object} layouts - Available layouts
 * @returns {Promise<void>}
 */
async function processFile(file, layouts) {
  const inputPath = path.join(pagesDir, file)
  const relativeDir = path.dirname(file)
  const outputPath = path.join(outputDir, relativeDir, path.basename(file).replace('.md', '.html'))

  try {
    log.parsingMarkdownFiles(file)
    const markdownTransform = createMarkdownTransform(layouts)
    
    await ensureDirectoryExists(path.dirname(outputPath))
    await pipeline(
      createReadStream(inputPath, 'utf-8'),
      markdownTransform,
      writeFile(outputPath)
    )
  } catch (error) {
    log.writeOutputFileError(file, error)
  }
}

/**
 * Ensures that a directory and all its parent directories exist
 * 
 * @param {string} directory - The directory path to ensure exists
 * @returns {Promise<void>}
 */
async function ensureDirectoryExists(directory) {
  try {
    await fs.promises.access(directory)
  } catch {
    await fs.promises.mkdir(directory, { recursive: true })
  }
}

function writeFile(output) {
  log.creatingFile(output)
  return createWriteStream(output, 'utf-8')
}

/**
 * Creates a transform stream that converts markdown to HTML and injects it into a layout
 * 
 * @param {Object} layouts - The rendered layout content
 * @returns {Transform} A transform stream that processes markdown to HTML
 */
function createMarkdownTransform(layouts) {
  return new Transform({
    transform(chunk, _, callback) {
      try {
        const markdown = chunk.toString()
        const metadata = extractMarkdownMetadata(markdown)
        const html = markdownToHtml(markdown)
        const pageLayout = metadata?.layout ? layouts[metadata.layout] : layouts.default
        const finalHtml = injectHtmlIntoLayout(html, pageLayout, metadata)
        const minifiedHtml = minifyHtml(finalHtml)

        callback(null, minifiedHtml)
      } catch (error) {
        callback(error)
      }
    }
  })
}

/**
 * Ensures that the output directory exists.
 * If the directory doesn't exist, it creates it recursively.
 *
 * @returns {Promise<void>} A promise that resolves when the output directory is ensured to exist.
 */
async function ensureOutputDirExists() {
  try {
    await fs.promises.access(outputDir)
  } catch {
    await fs.promises.mkdir(outputDir, { recursive: true })
  }
}

/**
 * Injects the HTML content into the layout.
 * 
 * @param {string} htmlContent - The HTML content to inject into the layout.
 * @param {string} layout - The layout content.
 * @param {object} metadata - The metadata extracted from the markdown content.
 * 
 * @returns {string} - The layout content with the markdown content injected.
 */
function injectHtmlIntoLayout(htmlContent, layout, metadata) {
  try {
    const layoutContent = injectMarkdownMetadata(layout, metadata)
    return layoutContent.replace(pageContentRegex, htmlContent)
  } catch (error) {
    log.insertHtmlIntoLayoutError(layout, error)
    throw error
  }
}