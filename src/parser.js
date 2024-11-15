// Este módulo processa o conteúdo HTML e substitui os includes pelos respectivos conteúdos
export function parseFileContent(content, partials, processedIncludes = new Set()) {
  const { processedContent, hasChanges } = processContent(content, partials, processedIncludes)

  if (hasChanges) {
    return parseFileContent(processedContent, partials, processedIncludes)
  }

  return processedContent
}

// Substitui os includes encontrados pelo conteúdo processado
function processContent(content, partials, processedIncludes) {
  const matches = findIncludes(content)
  let hasChanges = false
  let processedContent = content

  for (const match of matches) {
    const [fullMatch, partialName] = match

    const processedPartial = processPartial(partialName, partials, processedIncludes)

    if (processedPartial) {
      processedContent = processedContent.replace(fullMatch, processedPartial)
      hasChanges = true
    }
  }

  return { processedContent, hasChanges }
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
    return ''
  }

  const partialContent = partials[partialName]

  if (!partialContent) {
    console.warn(`Aviso: Partial "${partialName}" não encontrado`)
    return ''
  }

  processedIncludes.add(partialName)

  return parseFileContent(
    partialContent,
    partials,
    new Set(processedIncludes) // Cria uma cópia para preservar o estado anterior
  )
}


