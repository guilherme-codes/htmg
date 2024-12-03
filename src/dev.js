import liveServer from 'live-server'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { spawn } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicPath = path.join(__dirname, '..', 'output')

const params = {
  port: 3006,
  host: '0.0.0.0', 
  root: publicPath, 
  open: false,
  ignore: 'scss,node_modules',
  wait: 1000,
  logLevel: 0,
}

// @ts-ignore
liveServer.start(params)


const paths = [
  path.join(__dirname, '..', 'pages'),
  path.join(__dirname, '..', 'layouts'),
]

paths.forEach(path => 
  fs.watch(path, { recursive: true }, () => {
    spawn('npm', ['run', 'build'], { stdio: 'inherit', shell: true })
  })
)
