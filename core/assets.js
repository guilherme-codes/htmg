import path from 'path'
import { mkdir, readdir, stat, copyFile, writeFile } from 'fs/promises'
import { readFile } from 'fs/promises'
import * as log from '../log/index.js'
import { checkPathExists, getExecBasePath } from '../utils/path.js'
import env from '../utils/environment.js'
import { minifyCSS, minifyJS } from '../utils/minify.js'

/**
 * Builds assets with minification for CSS and JS files.
 * 
 * @param {string} origin - The path of the assets directory to copy from.
 * @param {string} dest - The path of the destination directory to copy the assets to.
 * @returns {Promise<void>} - A promise that resolves when the assets are built successfully, or rejects with an error if there's any issue.
 */
export async function buildAssets(origin, dest) {
  log.processingAssets()
  processAssets(origin, dest)
}

async function processAssets(origin, dest) {  
  try {
    const assetsPathExists = await checkPathExists(getExecBasePath(env.assetsDir))

    if (!assetsPathExists) {
      return
    }

    await mkdir(dest, { recursive: true })
    await copyAssetsDirectory(origin, dest)
  } catch (error) {
    log.buildAssetsError(error)
    throw error
  }
}

/**
 * Processes a file based on its extension - either copies it directly or minifies it.
 * 
 * @param {string} sourcePath - The source file path.
 * @param {string} destPath - The destination file path.
 */
async function processFile(sourcePath, destPath) {
  const extension = path.extname(sourcePath).toLowerCase()
  
  try {
    const content = await readFile(sourcePath, 'utf8')
    let processedContent

    switch (extension) {
    case '.css':
      processedContent = await minifyCSS(content)
      await writeFile(destPath, processedContent)
      console.log(`Minified CSS file: ${path.basename(sourcePath)}`)
      break
      
    case '.js':
      processedContent = await minifyJS(content)
      await writeFile(destPath, processedContent)
      console.log(`Minified JavaScript file: ${path.basename(sourcePath)}`)
      break
      
    default:
      await copyFile(sourcePath, destPath)
      console.log(`Copied file: ${path.basename(sourcePath)}`)
    }
  } catch (error) {
    log.buildAssetsError(`Error processing file ${sourcePath}: ${error}`)
    throw error
  }
}

/**
 * Copies the assets directory from the origin to the destination.
 *
 * @param {string} origin - The path of the origin directory.
 * @param {string} destination - The path of the destination directory.
 * @returns {Promise<void>} A promise that resolves when the assets directory is copied successfully.
 * @throws {Error} If there is an error while copying the assets directory.
 */
async function copyAssetsDirectory(origin, destination) {
  try {
    const items = await readdir(origin)
    const copyPromises = await mapFilesToCopy(items, origin, destination)

    await Promise.all(copyPromises)
  } catch (error) {
    log.buildAssetsError(error)
    throw error
  }
}

/**
 * Maps the files to copy from the origin directory to the destination directory.
 *
 * @param {Array<string>} items - The array of file names to copy.
 * @param {string} origin - The path of the origin directory.
 * @param {string} destination - The path of the destination directory.
 * @returns {Promise<Array>} - An array of promises that represent the copy operations.
 */
async function mapFilesToCopy(items, origin, destination) {
  return items.map(async (item) => {
    const itemOriginPath = path.join(origin, item)
    const itemDestinationPath = path.join(destination, item)
    const stats = await stat(itemOriginPath)

    if (stats.isDirectory()) {
      return processAssets(itemOriginPath, itemDestinationPath)
    } else {
      return processFile(itemOriginPath, itemDestinationPath)
    }
  })
}