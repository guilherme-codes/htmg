import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { assetsDir, outputDir } from '../utils/contants.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const assetsPath = path.join(__dirname, '..','..', assetsDir)
const distPath = path.join(__dirname, '..','..', outputDir)

function buildAssets(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const items = fs.readdirSync(src) 
  items.forEach(item => {
    const srcItem = path.join(src, item)
    const destItem = path.join(dest, item)

    const stats = fs.statSync(srcItem)

    if (stats.isDirectory()) {
      buildAssets(srcItem, destItem) 
    } else {
      fs.copyFileSync(srcItem, destItem)
    }
  })
}

export const buildAssetsFn = () => buildAssets(assetsPath, distPath)
console.log('Files copied to dist')
