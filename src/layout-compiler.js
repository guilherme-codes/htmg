import { parseFileContent } from './parser.js'
import { readLayouts } from './reader.js'

export async function compileLayouts() {
  const parsedLayouts = {}

  try {
    const layouts = await getLayouts()

    for (const [layoutName, files] of Object.entries(layouts)) {
      const compiledContent = processLayoutFiles(layoutName, files)

      parsedLayouts[layoutName] = compiledContent
    }

    return parsedLayouts

  } catch (error) {
    console.error('Erro ao compilar layouts:', error)
  } 
}


async function getLayouts() {
  try {
    const layouts = await readLayouts()
    return layouts
  } catch (error) {
    console.error('Erro ao ler layouts:', error)
    throw error
  }
}

function processLayoutFiles(layoutName, files) {
  if (!files.index) {
    console.warn(`Aviso: Layout "${layoutName}" não possui arquivo index.html`)
    return null
  }

  try {
    const compiledContent = parseFileContent(files.index, files)
    return compiledContent
  } catch (error) {
    console.error(`Erro ao processar arquivos do layout "${layoutName}":`, error)
    return null
  }
}
