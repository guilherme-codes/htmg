import path from 'path'
import fs from 'fs'
import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import { Transform } from 'stream'
import { extractMetadata, markdownToHtml, injectMarkdownMetadata } from '../utils/content.js'
import { outputDir, pagesDir } from '../utils/contants.js'
import * as log from '../log/index.js'
import { pageContentRegex } from '../utils/regex.js'
import { minifyHtml } from '../utils/minify.js'
import { pipe } from '../utils/fn.js'

/**
 * Convert markdown pages to html files and add its content to the provided layouts.
 * 
 * @param {Object} layouts - An object where the key is the layout name and the value is the layout content.
 * @returns {Promise<void>} - A promise that resolves when all files are processed.
 */
export async function buildPages(layouts) {
  try {
    await createOutputDir()
    const files = await getPageContentFiles(pagesDir)

    for (const file of files) {
      await processFile(file, layouts)
    }

    log.pagesBuildSuccess()
  } catch (error) {
    log.compileMarkdownFilesError(error)
  }
}

/**
 * Process a single markdown file and convert it to HTML
 * 
 * @param {Object} file - Object containing the markdown file info
 * @param {Object} layouts - Available layouts
 * @returns {Promise<void>}
 */
async function processFile(file, layouts) {
  const { fullPath, relativePath } = file
  const { outputPath, isMarkdown } = getOutputPath(relativePath)
    
  try {
    log.parsingMarkdownFiles(relativePath)
    const markdownTransform = createPageContentTransform(layouts, isMarkdown)
    
    await ensureDirectoryExists(path.dirname(outputPath))    
    await pipeline(
      createReadStream(fullPath, 'utf-8'),
      markdownTransform,
      writeFile(outputPath)
    )
  } catch (error) {
    log.writeOutputFileError(relativePath, error)
  }
}

function getOutputPath(relativePath) {
  const isMarkdown = path.extname(relativePath) === '.md'
 
  const outputPath =  isMarkdown ?
    path.join(outputDir, relativePath.replace('.md', '.html')) :
    path.join(outputDir, relativePath)

  return { outputPath, isMarkdown }
}

function writeFile(output) {
  log.creatingFile(output)
  return createWriteStream(output, 'utf-8')
}

/**
 * Creates a transform stream that converts markdown to HTML and injects it into a layout
 * 
 * @param {Object} layouts - The rendered layout content
 * @param {boolean} isMarkdown - Whether the content is markdown or not
 * 
 * @returns {Transform} A transform stream that processes markdown to HTML
 */
function createPageContentTransform(layouts, isMarkdown) {
  return new Transform({
    transform(chunk, _, callback) {
      try {
        const html = pipe(
          chunk => chunk.toString(),
          content => extractPageData(content, isMarkdown),
          data => injectHtmlMetadata(data, layouts),
          finalHtml => minifyHtml(finalHtml)
        )

        callback(null, html(chunk))
      } catch (error) {
        callback(error)
      }
    }
  })
}

/**
  * Extracts the HTML content and metadata from a markdown string.
  *
  * @param {string} content - The markdown string to extract data from.
  * @param {boolean} isMarkdown - Whether the content is markdown or not.
  * 
  * @returns {Object} - An object containing the HTML content and metadata.
*/
function extractPageData(content, isMarkdown) {
  return {
    html: isMarkdown ? markdownToHtml(content) : content,
    metadata: extractMetadata(content)
  }
}

/**
 * Injects HTML metadata into a layout.
 *
 * @param {Object} data - The data object containing the HTML and metadata.
 * @param {Object} layouts - The layouts object containing different layout options.
 * @returns {string} - The injected HTML with the layout.
 */

function injectHtmlMetadata(data, layouts) {
  const { html, metadata } = data
  const layout = layouts[metadata?.layout || 'default']

  return injectHtmlIntoLayout(html, layout, metadata)
}

/**
 * Ensures that a directory exists.
 * If the directory doesn't exist, it creates it recursively.
 *
 * @param {string} dir - Directory path to ensure exists
 * @returns {Promise<void>} A promise that resolves when the directory is ensured to exist
 */
async function ensureDirectoryExists(dir) {
  try {
    await fs.promises.access(dir)
  } catch {
    await fs.promises.mkdir(dir, { recursive: true })
  }
}

/**
 * Creates the output directory if it doesn't exist. 
 * If it exists, it deletes it and creates a new one.
 */
async function createOutputDir() {
  try {
    await fs.promises.rm(outputDir, { recursive: true, force: true })
    await fs.promises.mkdir(outputDir, { recursive: true })
  } catch (error) {
    // TODO: Handle error
    throw error
  }
}

/**
 * Recursively retrieves all markdown files from the specified directory and its subdirectories.
 *
 * @param {string} directory - The root directory path to search for markdown files
 * @param {string} [baseDir] - The base directory for calculating relative paths (defaults to directory)
 * @returns {Promise<Array<{fullPath: string, relativePath: string}>>} - Array of objects containing full and relative paths
 * @throws {Error} - If there is an error reading the directory
 */
async function getPageContentFiles(directory, baseDir = directory) {
  try {
    const files = await fs.promises.readdir(directory, { withFileTypes: true })
    const pageContentFiles = []

    for (const file of files) {
      const fullPath = path.join(directory, file.name)
      const relativePath = path.relative(baseDir, fullPath)

      if (file.isDirectory()) {
        const subDirFiles = await getPageContentFiles(fullPath, baseDir)
        pageContentFiles.push(...subDirFiles)
      } else if (['.md', '.html'].includes(path.extname(file.name))) {
        pageContentFiles.push({ fullPath, relativePath })
      }
    }

    return pageContentFiles
  } catch (error) {
    log.readDirectoryError(directory, error)
    throw error
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