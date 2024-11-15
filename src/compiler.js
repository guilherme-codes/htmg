import fs from 'fs/promises'
import path from 'path'
import { parseFileContent } from './parser.js'
import { readLayouts } from './reader.js'

export async function compileLayouts() {
  try {
    // Cria o diretório dist se não existir
    await fs.mkdir('dist').catch(() => {})
        
    // Lê todos os layouts e seus arquivos
    const layouts = await readLayouts()
        
    // Processa cada layout
    for (const [layoutName, files] of Object.entries(layouts)) {
      if (!files.index) {
        console.warn(`Aviso: Layout "${layoutName}" não possui arquivo index.html`)
        continue
      }
            
      // Processa o arquivo index com seus partials recursivamente
      let compiledContent = parseFileContent(files.index, files)
            
      // Salva o arquivo compilado
      const outputPath = path.join('dist', `${layoutName}.html`)
      await fs.writeFile(outputPath, compiledContent)
            
      console.log(`Layout ${layoutName} compilado com sucesso para ${outputPath}`)
    }
        
  } catch (error) {
    console.error('Erro ao compilar layouts:', error)
  }
}
