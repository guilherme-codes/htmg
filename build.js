import { buildAssets } from './core/assets.js'
import { buildLayouts } from './core/layouts.js'
import { buildPages } from './core/pages.js'
import { buildSitemap } from './core/sitemap.js'
import { assetsDir, outputDir } from './utils/contants.js'
import { getBasePath } from './utils/path.js'

const assets = getBasePath(assetsDir)
const output = getBasePath(outputDir)
const layoutsContent = await buildLayouts()

await buildPages(layoutsContent)
await buildAssets(assets, output)
await buildSitemap(output, 'https://guilhermecodes.com')
