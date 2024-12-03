import { buildAssetsFn } from './core/assets.js'
import { buildLayouts } from './core/layouts.js'
import { buildPages } from './core/pages.js'

(async function build() {
  const layoutsContent = await buildLayouts()
  
  await buildPages(layoutsContent)
  buildAssetsFn()
})()
