import { buildAssets } from './core/assets.js'
import { buildLayouts } from './core/layouts.js'
import { buildPages } from './core/pages.js'
import { assetsDir, outputDir } from './utils/contants.js'
import { getBasePath } from './utils/path.js'

(async function build() {
  const layoutsContent = await buildLayouts()
  
  await buildPages(layoutsContent)
  await buildAssets(getBasePath(assetsDir), getBasePath(outputDir))
})()
