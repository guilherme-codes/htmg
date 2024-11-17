import path from 'path'
import fs from 'fs/promises'
import { markdownToHtml } from '../utils/markdown-to-html.js'
import { outputDir, pagesDir } from '../utils/contants.js'

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
    console.error('Erro ao processar arquivos:', error)
  }
}

async function createPage(file, content, layouts) {
  const htmlContent = markdownToHtml(content)
  const finalHtml = injectHtmlIntoLayout(htmlContent, layouts.default)

  const outputFilePath = path.join(outputDir, file.replace('.md', '.html'))
  await writeOutputFile(outputFilePath, finalHtml)
  console.log(`Arquivo processado: ${outputFilePath}`)

}

async function ensureOutputDirExists() {
  try {
    await fs.access(outputDir) 
  } catch {
    await fs.mkdir(outputDir, { recursive: true }) 
  }
}

async function getMarkdownFiles(directory) {
  const files = await fs.readdir(directory)
  return files.filter(file => path.extname(file) === '.md')
}

async function readFileContent(filePath) {
  return await fs.readFile(filePath, 'utf-8')
}


function injectHtmlIntoLayout(htmlContent, layout) {
  const contentRegex = /<!--\s*page_content\s*-->/
  
  return layout.replace(contentRegex, htmlContent)
}

async function writeOutputFile(filePath, content) {
  await fs.writeFile(filePath, content, 'utf-8')
}
