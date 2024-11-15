export function parseFileContent(content, partials, processedIncludes = new Set()) {
  const includes = findIncludes(content)

  return includes
    .reduce((processedContent, [fullMatch, partialName]) => {
      const processedPartial = processPartial(partialName, partials, processedIncludes)

      return processedContent.replace(fullMatch, processedPartial)
    }, content)
}


function findIncludes(content) {
  const includeRegex = /<!--\s*include:\s*(\w+)\s*-->/g
  const matches = []
  let match

  while ((match = includeRegex.exec(content)) !== null) {
    matches.push(match)
  }

  return matches
}

function processPartial(partialName, partials, processedIncludes) {
  validatePartials(partials, partialName, processedIncludes)
  
  const partialContent = partials[partialName]
  processedIncludes.add(partialName)

  return parseFileContent(
    partialContent,
    partials,
    new Set(processedIncludes)
  )
}


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


