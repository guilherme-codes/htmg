/**
 * Class to read the layout file and return its contents
 * 
 * @returns {Object} Layout contents organized by directory, its files and partials
 */

import FileSystemError from './Errors/FileSystemError.js'
import fs from 'fs/promises'
import path from 'path'

export default class LayoutFileReader {
  #basePath = 'layouts'

  /**
   * Reads the content of a file
   * @param {string} basePath Path to folder containing layout files (default: layouts)
   *  
   * @returns {Promise<string>} File contents
   */
  constructor(basePath) {
    this.validateBasePath(basePath)
    this.#basePath = basePath
  }

  /**
     * Validates if the provided base path exists and is accessible
     * @throws {Error} If path is invalid or inaccessible
     */
  async validateBasePath(basePath) {
    try {
      await fs.access(basePath)
    } catch (error) {
      FileSystemError.accessPathError(basePath, error)
    }
  }
}

const reader = new LayoutFileReader('laysouts')