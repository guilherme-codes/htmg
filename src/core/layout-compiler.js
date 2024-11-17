import { compileLayoutsError, indexNotFoundError } from '../log/compiler.js'
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
    compileLayoutsError(error)
  } 
}


async function getLayouts() {
  const layouts = await readLayouts()
  return layouts
}

function processLayoutFiles(layoutName, files) {
  if (!files.index) {
    indexNotFoundError(layoutName)
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
