import fs from 'fs'
import { layoutsDir, pagesDir } from './contants.js'
import { getBasePath } from './path.js'
import { spawn } from 'child_process'

const paths = [
  getBasePath(pagesDir),
  getBasePath(layoutsDir)
]

export function watchChanges() {
  paths.forEach(path => 
    fs.watch(path, { recursive: true }, () => {
      spawn('npm', ['run', 'build'], { stdio: 'inherit', shell: true })
    })
  )
}
