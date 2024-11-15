/**
* This module intent to read all layout files from the base directory and then returns 
* their contents in an organized structure. The return object will be used by the parser 
* to generate the final HTML content, replacing the includes comments.
* 
* e.g. {
*   layout1: {
*     index: '...',
*     header: '...',
*     footer: '...',
*  },
* }
**/

import fs from 'fs/promises'
import path from 'path'
import { accessPathError, readFileError } from './log/errors/fileSystem.js'

/**
* Reads all layout files from the base directory.
* @param {string} [basePath='layouts'] Path to folder containing layout files (default: layouts)
* @returns {Promise<Object>} Layout contents organized by directory and partials.
*/
export async function readLayouts(basePath = 'layouts') {
  await validateBasePath(basePath)
  const directories = await getDirectoriesList(basePath)
  const layoutContents = await Promise.all(
    directories.map(dir => readDirectoryContent(basePath, dir))
  )

  return Object.fromEntries(layoutContents)
}

/**
* Validates if the provided base path exists and is accessible
* @param {string} basePath Path to folder containing layout files
* 
* @throws {Error} If path is invalid or inaccessible
*/

async function validateBasePath(basePath) {
  try {
    await fs.access(basePath)
  } catch (error) {
    accessPathError(basePath, error)
  }
}

/**
* Gets all directory entries from the base path
* @param {string} basePath Path to folder containing layout files
* @returns Array of directory entries
*/

async function getDirectoriesList(basePath) {
  const entries = await fs.readdir(basePath, { withFileTypes: true })
  return entries.filter(entry => entry.isDirectory())
}

/**
* Processes a single directory
* @param {string} basePath Path to folder containing layout files
* @param directory Directory entry
* @returns {Promise<[string, Object]>} Directory name and its processed contents
*/

async function readDirectoryContent(basePath, directory) {
  const directoryPath = path.join(basePath, directory.name)
  const files = await fs.readdir(directoryPath)
  const contents = await readDirectoryFiles(directoryPath, files)

  return [directory.name, contents]
}

/**
* Reads the content of a file
* @param {string} filePath Path to the file
* @returns {Promise<string | undefined>} File contents
*/

async function readFileContent(filePath) {
  try {
    return await fs.readFile(filePath, 'utf-8')
  } catch (error) {
    readFileError(filePath, error)
  }
}

/**
* Processes all files in a directory in parallel
* @param {string} dirPath Path to the directory
* @param {Array<string>} files Array of file names
* @returns {Promise<Object>} Object containing file contents
*/

async function readDirectoryFiles(dirPath, files) {
  const fileContents = await Promise.all(
    files.map(file => readFileContent(path.join(dirPath, file)))
  )

  return Object.fromEntries(
    files.map((file, index) => [path.parse(file).name, fileContents[index]])
  )
}
