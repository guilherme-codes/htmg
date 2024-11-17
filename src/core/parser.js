import { parserFileContentError, parserPartialsError } from '../log/parser.js'

/**
 * Parses the content of a file and replaces any includes with their corresponding partials.
 * 
 * @param {string} content - The content of the file.
 * @param {Object} partials - An object containing the partials to be included.
 * @param {Set} processedIncludes - A set of already processed includes to avoid circular dependencies.
 * @returns {string} - The processed content with includes replaced by partials.
 */
export function parseFileContent(content, partials, processedIncludes = new Set()) {
  try {
    const includes = findIncludes(content)

    return includes
      .reduce((processedContent, [fullMatch, partialName]) => {
        const processedPartial = processPartial(partialName, partials, processedIncludes)

        return processedContent.replace(fullMatch, processedPartial)
      }, content)
  } catch (error) {
    parserFileContentError(content, error)

    throw error
  }
}

/**
 * Finds all include directives in the given content.
 *
 * @param {string} content - The content to search for include directives.
 * @returns {Array} - An array of matches found.
 */
function findIncludes(content) {
  const includeRegex = /<!--\s*include:\s*(\w+)\s*-->/g
  const matches = []
  let match

  while ((match = includeRegex.exec(content)) !== null) {
    matches.push(match)
  }
  
  return matches
}

/**
 * Processes a partial by recursively parsing its content and its dependencies.
 *
 * @param {string} partialName - The name of the partial to process.
 * @param {object} partials - An object containing all the partials.
 * @param {Set} processedIncludes - A set containing the names of already processed partials.
 * @returns {string} - The parsed content of the partial.
 */
function processPartial(partialName, partials, processedIncludes) {

  try {
    validatePartials(partials, partialName, processedIncludes)
    
    const partialContent = partials[partialName]
    processedIncludes.add(partialName)
  
    return parseFileContent(
      partialContent,
      partials,
      new Set(processedIncludes)
    )
  } catch (error) {
    parserPartialsError(partialName, error)

    throw error
  }
}


/**
 * Validates the existence of a partial and checks for circular includes.
 *
 * @param {Object} partials - The object containing all the partials.
 * @param {string} partialName - The name of the partial to validate.
 * @param {Set} processedIncludes - The set of processed includes.
 * @throws {Error} If the partial is not found or a circular include is detected.
 */
function validatePartials(partials, partialName, processedIncludes) {
  if (!partials[partialName]) {
    console.warn(`Aviso: Partial "${partialName}" não encontrado`)
    throw Error()
  }

  if (processedIncludes.has(partialName)) {
    console.warn(`Aviso: Include circular detectado para "${partialName}"`)
    throw Error()
  }
}


