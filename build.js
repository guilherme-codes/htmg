import { buildAssets } from './core/assets.js'
import { buildLayouts } from './core/layouts.js'
import { buildPages } from './core/pages.js'
import { buildSitemap } from './core/sitemap.js'
import env from './utils/environment.js'
import { getExecBasePath } from './utils/path.js'

const assets = getExecBasePath(env.assetsDir)
const output = getExecBasePath(env.outputDir)

export async function build() {
  const layoutsContent = await buildLayouts()
  await buildPages(layoutsContent)
  await buildAssets(assets, output)
  await buildSitemap(output, env.siteUrl)
}

await build()
