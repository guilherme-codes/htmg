import fs from 'fs'
import config from './config.js'
import { getBasePath } from './path.js'
import { build } from '../build.js'

const paths = [
  getBasePath(config.pagesDir),
  getBasePath(config.layoutsDir)
]

export function watchChanges() {
  paths.forEach(path => 
    fs.watch(path, { recursive: true }, () => {
      build()
    })
  )
}
