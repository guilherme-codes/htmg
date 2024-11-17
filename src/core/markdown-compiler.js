import path from 'path'
import fs from 'fs/promises'
import { markdownToHtml } from '../utils/markdown-to-html.js'
import { outputDir, pagesDir } from '../utils/contants.js'
import { readDirectoryError, readFileError } from '../log/reader.js'
import { compileMarkdownFilesError, insertHtmlIntoLayoutError, writeOutputFileError } from '../log/compiler.js'

export async function compileMarkdownFiles(layouts) {
  try {
    await ensureOutputDirExists()

    const files = await getMarkdownFiles(pagesDir)

    for (const file of files) {
      const filePath = path.join(pagesDir, file)
      const content = await readFileContent(filePath)

      await createPage(file, content, layouts)
    }

    console.log('Todos os arquivos foram processados!')
  } catch (error) {
    compileMarkdownFilesError(error)
  }
}

async function createPage(file, content, layouts) {
  try {
    const htmlContent = markdownToHtml(content)
    const finalHtml = injectHtmlIntoLayout(htmlContent, layouts.default)
  
    const outputFilePath = path.join(outputDir, file.replace('.md', '.html'))
    await writeOutputFile(outputFilePath, finalHtml)
  } catch (error) {
    writeOutputFileError(file, error)
    
  }
}

async function ensureOutputDirExists() {
  try {
    await fs.access(outputDir) 
  } catch {
    await fs.mkdir(outputDir, { recursive: true }) 
  }
}

async function getMarkdownFiles(directory) {
  try {
    const files = await fs.readdir(directory)
    return files.filter(file => path.extname(file) === '.md')
  } catch (error) {
    readDirectoryError(directory, error)
    throw error
  }
}

async function readFileContent(filePath) {
  try {
    return await fs.readFile(filePath, 'utf-8')
  } catch (error) {
    readFileError(filePath, error)
  }
}


function injectHtmlIntoLayout(htmlContent, layout) {
  try {
    const contentRegex = /<!--\s*page_content\s*-->/
    
    return layout.replace(contentRegex, htmlContent)
  } catch (error) {
    insertHtmlIntoLayoutError(layout, error)
  }
}

async function writeOutputFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content, 'utf-8')

  } catch (error) {
    writeOutputFileError(filePath, error)
  }
}
