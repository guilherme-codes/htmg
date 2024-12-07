import dotenv from 'dotenv'
import { getBasePath } from './path.js'
import env from 'env-var'

dotenv.config({ path: getBasePath('.env') })

const config = {
  outputDir: env.get('OUTPUT_DIR').default('dist').asString(),
  pagesDir: env.get('PAGES_DIR').default('pages').asString(),
  layoutsDir: env.get('LAYOUTS_DIR').default('layouts').asString(),
  assetsDir: env.get('ASSETS_DIR').default('assets').asString(),
  siteUrl: env.get('SITE_URL').required().asString()
}

export default config
