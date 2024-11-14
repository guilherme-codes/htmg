/**
 * Class to read the layout files and return its contents
 * 
 * @returns {Object} Layout contents organized by directory, its files and partials
 */

import FileSystemError from './Errors/FileSystemError.js'
import fs from 'fs/promises'
import path from 'path'

class FileReader {
  #basePath

  /**
   * Reads the content of a file
   * @param {string} [basePath='layouts'] Path to folder containing layout files (default: layouts)
   *  
   */
  constructor(basePath = 'layouts') {
    this.#validateBasePath(basePath)
    this.#basePath = basePath
  }

  /**
     * Reads all layout files from the base directory
     * @returns {Promise<Object>} Layout contents organized by directory and partials.
     */
  async readLayouts() {
    const directories = await this.#getDirectoriesList()
    const layoutContents = await this.#processLayoutDirectoryContent(directories)

    return Object.fromEntries(layoutContents)
  }

  /**
     * Validates if the provided base path exists and is accessible
     * @param {string} basePath Path to folder containing layout files
     * 
     * @throws {Error} If path is invalid or inaccessible
     */
  async #validateBasePath(basePath) {
    try {
      await fs.access(basePath)
    } catch (error) {
      FileSystemError.accessPathError(basePath, error)
    }
  }

  /**
     * Gets all directory entries from the base path
     * @returns {Promise<Array>} Array of directory entries
     */
  async #getDirectoriesList() {
    const entries = await fs.readdir(this.#basePath, { withFileTypes: true })
    return entries.filter(entry => entry.isDirectory())
  }

  /**
     * Processes all directories in parallel
     * @param {Array} directories Array of directory entries
     * @returns {Promise<Array>} Array of processed directory contents
     */
  async #processLayoutDirectoryContent(directories) {
    const directoryPromises = directories.map(dir => 
      this.#readDirectoryContent(dir)
    )
    return Promise.all(directoryPromises)
  }

  /**
     * Processes a single directory
     * @param directory Directory entry
     * @returns {Promise<Array>} Directory name and its processed contents
     */
  async #readDirectoryContent(directory) {
    const directoryPath = path.join(this.#basePath, directory.name)
    const files = await fs.readdir(directoryPath)
    const contents = await this.#readDirectoryFiles(files, directoryPath)

    return [directory.name, contents]
  }

 
  /**
     * Processes all files in a directory in parallel
     * @param {Array} files Array of file names
     * @param {string} dirPath Path to the directory
     * @returns {Promise<Object>} Object containing file contents
     */
  async #readDirectoryFiles(files, dirPath) {
    const filePromises = files.map(file => 
      this.#readFileContent(file, dirPath)
    )
    const fileContents = await Promise.all(filePromises)

    return Object.fromEntries(fileContents)
  }

  /**
     * Processes a single file
     * @param {string} file File name
     * @param {string} dirPath Path to the directory
     * @returns {Promise<Array>} File name and its contents
     */
  async #readFileContent(file, dirPath) {
    const filePath = path.join(dirPath, file)
    const content = await fs.readFile(filePath, 'utf-8')
    const fileName = path.parse(file).name

    return [fileName, content]
  }
}

export default FileReader