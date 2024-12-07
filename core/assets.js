import path from 'path'
import { mkdir, readdir, stat, copyFile } from 'fs/promises'
import * as log from '../log/index.js'
import { checkPathExists, getBasePath } from '../utils/path.js'
import env from '../utils/environment.js'

/**
 * Builds assets.
 * 
 * @param {string} origin - The path of the assets directory to copy from.
 * @param {string} dest - The path of the destination directory to copy the assets to.
 * @returns {Promise<void>} - A promise that resolves when the assets are built successfully, or rejects with an error if there's any issue.
 */
export async function buildAssets(origin, dest) {  
  try {
    const assetsPathExists = await checkPathExists(getBasePath(env.assetsDir))

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
      return buildAssets(itemOriginPath, itemDestinationPath)
    } else {
      return copyFile(itemOriginPath, itemDestinationPath)
    }
  })
}

