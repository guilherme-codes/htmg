/**
 * Watch for changes in the pages and layouts directories
 */

import fs from 'fs'
import env from './environment.js'
import { getBasePath } from './path.js'
import { build } from '../build.js'

const paths = [
  getBasePath(env.pagesDir),
  getBasePath(env.layoutsDir)
]

export function watchChanges() {
  paths.forEach(path => 
    fs.watch(path, { recursive: true }, () => {
      build()
    })
  )
}
