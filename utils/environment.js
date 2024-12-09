/**
 *  This file is responsible for loading the environment variables from the .env file.
 */
import dotenv from 'dotenv'
import { getExecBasePath } from './path.js'
import env from 'env-var'

dotenv.config({ path: getExecBasePath('.env') })

const envs = {
  outputDir: env.get('OUTPUT_DIR').default('dist').asString(),
  pagesDir: env.get('PAGES_DIR').default('pages').asString(),
  layoutsDir: env.get('LAYOUTS_DIR').default('layouts').asString(),
  assetsDir: env.get('ASSETS_DIR').default('assets').asString(),
  siteUrl: env.get('SITE_URL').asString() || 'http://localhost:3006',
}

export default envs
