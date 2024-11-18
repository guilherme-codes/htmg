import { compileLayoutFilesError, compileLayoutsError, indexNotFoundError } from '../log/build.js'
import { parseFileContent } from './parser.js'
import { readLayouts } from './reader.js'

/**
 * Build layouts by processing layout files and returning the condensed final result.
 * This result will be used to generate the final HTML content using the md pages.
 * 
 * @returns {Promise<Object>} A promise that resolves to an object containing the layout 
 * name as key and the html content its value.
 */
export async function buildLayouts() {
  const parsedLayouts = {}

  try {
    const layouts = await readLayouts()

    for (const [layoutName, files] of Object.entries(layouts)) {
      const compiledContent = processLayoutFiles(layoutName, files)

      parsedLayouts[layoutName] = compiledContent
    }

    return parsedLayouts

  } catch (error) {
    compileLayoutsError(error)
  } 
}


/**
 * Processes layout files and returns the compiled content with all partials processed.
 *
 * @param {string} layoutName - The name of the layout.
 * @param {object} files - The layout files.
 * @returns {string | undefined} - The compiled content.
 */
function processLayoutFiles(layoutName, files) {
  if (!files.index) {
    indexNotFoundError(layoutName)
  }

  try {
    const compiledContent = parseFileContent(files.index, files)
    return compiledContent
  } catch (error) {
    compileLayoutFilesError(layoutName, error)
  }
}
