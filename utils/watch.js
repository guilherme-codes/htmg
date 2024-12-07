import fs from 'fs'
import config from './config.js'
import { getBasePath } from './path.js'
import { spawn } from 'child_process'

const paths = [
  getBasePath(config.pagesDir),
  getBasePath(config.layoutsDir)
]

export function watchChanges() {
  paths.forEach(path => 
    fs.watch(path, { recursive: true }, () => {
      spawn('npm', ['run', 'build'], { stdio: 'inherit', shell: true })
    })
  )
}
