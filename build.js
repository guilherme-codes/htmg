import { buildAssets } from './core/assets.js'
import { buildLayouts } from './core/layouts.js'
import { buildPages } from './core/pages.js'
import { buildSitemap } from './core/sitemap.js'
import config from './utils/config.js'
import { getBasePath } from './utils/path.js'

const assets = getBasePath(config.assetsDir)
const output = getBasePath(config.outputDir)
const layoutsContent = await buildLayouts()

await buildPages(layoutsContent)
await buildAssets(assets, output)
await buildSitemap(output, config.siteUrl)
