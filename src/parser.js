
// Substitui os includes encontrados pelo conteúdo processado
export function parseFileContent(content, partials, processedIncludes = new Set()) {
  const matches = findIncludes(content)
  let processedContent = content

  for (const match of matches) {
    const [fullMatch, partialName] = match

    const processedPartial = processPartial(partialName, partials, processedIncludes)

    processedContent = processedContent.replace(fullMatch, processedPartial)
  }

  return processedContent 
}

// Localiza todos os includes no conteúdo
function findIncludes(content) {
  const includeRegex = /<!--\s*include:\s*(\w+)\s*-->/g
  const matches = []
  let match

  while ((match = includeRegex.exec(content)) !== null) {
    matches.push(match)
  }

  return matches
}

// Processa um partial recursivamente
function processPartial(partialName, partials, processedIncludes) {
  
  if (processedIncludes.has(partialName)) {
    console.warn(`Aviso: Include circular detectado para "${partialName}"`)
    throw Error()
  }

  const partialContent = partials[partialName]

  if (!partialContent) {
    console.warn(`Aviso: Partial "${partialName}" não encontrado`)
    throw Error()
  }

  processedIncludes.add(partialName)

  return parseFileContent(
    partialContent,
    partials,
    new Set(processedIncludes) // Cria uma cópia para preservar o estado anterior
  )
}


