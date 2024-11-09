export function processLayoutRecursive(content, partials, processedIncludes = new Set()) {
  let processedContent = content
  const includeRegex = /<!--\s*include:\s*(\w+)\s*-->/g
    
  let match
  let hasChanges = false
    
  while ((match = includeRegex.exec(content)) !== null) {
    const [fullMatch, partialName] = match
        
    // Evita loops infinitos checando se já processamos este include
    if (processedIncludes.has(partialName)) {
      console.warn(`Aviso: Include circular detectado para "${partialName}"`)
      continue
    }
        
    if (partials[partialName]) {
      processedIncludes.add(partialName)
            
      // Processa recursivamente o conteúdo do partial antes de incluí-lo
      const processedPartial = processLayoutRecursive(
        partials[partialName],
        partials,
        new Set(processedIncludes)
      )
      
      processedContent = processedContent.replace(fullMatch, processedPartial)
      hasChanges = true
    } else {
      console.warn(`Aviso: Partial "${partialName}" não encontrado`)
    }
  }
    
  // Se houve mudanças, processa novamente para garantir que não há mais includes
  if (hasChanges) {
    return processLayoutRecursive(processedContent, partials, processedIncludes)
  }
    
  return processedContent
}
