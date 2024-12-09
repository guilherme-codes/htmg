/**
 * Watch for changes in the pages and layouts directories
 */

import fs from 'fs'
import env from './environment.js'
import { getExecBasePath } from './path.js'
import { build } from '../build.js'

const paths = [
  getExecBasePath(env.pagesDir),
  getExecBasePath(env.layoutsDir),
  getExecBasePath(env.assetsDir)
]

export function watchChanges() {
  paths.forEach(path => 
    fs.watch(path, { recursive: true }, () => {
      build()
    })
  )
}
