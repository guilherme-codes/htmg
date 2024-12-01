import path from 'path'
import fs from 'fs'
import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import { Transform } from 'stream'
import { extractMarkdownMetadata, markdownToHtml, injectMarkdownMetadata } from '../utils/markdown.js'
import { outputDir, pagesDir } from '../utils/contants.js'
import { readDirectoryError } from '../log/reader.js'
import { compileMarkdownFilesError, insertHtmlIntoLayoutError, writeOutputFileError } from '../log/build.js'

/**
 * Convert markdown pages to html files and add its content to the provided layouts.
 * 
 * @param {Object} layouts - An object where the key is the layout name and the value is the layout content.
 * @returns {Promise<void>} - A promise that resolves when all files are processed.
 */
export async function buildPages(layouts) {
  try {
    await ensureOutputDirExists()
    const files = await getMarkdownFiles(pagesDir)

    for (const file of files) {
      await processFile(file, layouts)
    }

    console.log('Todos os arquivos foram processados!')
  } catch (error) {
    compileMarkdownFilesError(error)
  }
}

/**
 * Process a single markdown file and convert it to HTML
 * 
 * @param {string} file - The markdown file name
 * @param {Object} layouts - Available layouts
 * @returns {Promise<void>}
 */
async function processFile(file, layouts) {
  const inputPath = path.join(pagesDir, file)
  const outputPath = path.join(outputDir, file.replace('.md', '.html'))

  try {
    const markdownTransform = createMarkdownTransform(layouts.default)
    
    await pipeline(
      createReadStream(inputPath, 'utf-8'),
      markdownTransform,
      createWriteStream(outputPath, 'utf-8')
    )
  } catch (error) {
    writeOutputFileError(file, error)
  }
}

/**
 * Creates a transform stream that converts markdown to HTML and injects it into a layout
 * 
 * @param {string} layout - The layout template to inject the HTML into
 * @returns {Transform} A transform stream that processes markdown to HTML
 */
function createMarkdownTransform(layout) {
  return new Transform({
    transform(chunk, _, callback) {
      try {
        const markdown = chunk.toString()
        const metadata = extractMarkdownMetadata(markdown)
        const html = markdownToHtml(markdown)
        const finalHtml = injectHtmlIntoLayout(html, layout, metadata)
        
        callback(null, finalHtml)
      } catch (error) {
        callback(error)
      }
    }
  })
}


async function ensureOutputDirExists() {
  try {
    await fs.promises.access(outputDir)
  } catch {
    await fs.promises.mkdir(outputDir, { recursive: true })
  }
}

async function getMarkdownFiles(directory) {
  try {
    const files = await fs.promises.readdir(directory)
    return files.filter(file => path.extname(file) === '.md')
  } catch (error) {
    readDirectoryError(directory, error)
    throw error
  }
}

function injectHtmlIntoLayout(htmlContent, layout, metadata) {
  try {
    const contentRegex = /<!--\s*page_content\s*-->/
    const layoutContent = injectMarkdownMetadata(layout, metadata)

    return layoutContent.replace(contentRegex, htmlContent)
  } catch (error) {
    insertHtmlIntoLayoutError(layout, error)
  }
}


