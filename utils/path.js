/**
 * This file is responsible for providing utility functions to work with paths.
 */

import { access } from 'fs/promises'
import path from 'path'

export function getBasePath(directory) {
  const basePath = process.cwd()

  if (!directory) {
    return basePath
  }
  
  return path.join(basePath, directory)
}

export async function checkPathExists(dest) {
  return access(dest)
    .then(() => true)
    .catch(() => false)
}