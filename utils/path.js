import { access } from 'fs/promises'
import path from 'path'

export function getBasePath(directory) {
  const basePath = process.cwd()
  
  return path.join(basePath, directory)
}

export async function checkPathExists(dest) {
  return access(dest)
    .then(() => true)
    .catch(() => false)
}