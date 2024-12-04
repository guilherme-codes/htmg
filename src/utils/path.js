import path from 'path'

export function getBasePath(directory) {
  const basePath = process.cwd()
  
  return path.join(basePath, directory)
}