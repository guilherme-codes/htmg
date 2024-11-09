import fs from 'fs/promises'
import path from 'path'

export async function readLayoutFiles(layoutDir) {
  const layouts = {}
    
  // Lê todos os diretórios dentro de layouts
  const directories = await fs.readdir(layoutDir)
    
  for (const dir of directories) {
    const dirPath = path.join(layoutDir, dir)
    const stat = await fs.stat(dirPath)
        
    if (stat.isDirectory()) {
      // Lê todos os arquivos dentro do diretório do layout
      const files = await fs.readdir(dirPath)
      layouts[dir] = {}
            
      for (const file of files) {
        const filePath = path.join(dirPath, file)
        const content = await fs.readFile(filePath, 'utf-8')
        layouts[dir][path.parse(file).name] = content
      }
    }
  }
    
  return layouts
}
