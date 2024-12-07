import liveServer from 'live-server'
import env from './environment.js'
import { getBasePath } from './path.js'
import * as log from '../log/index.js'

const publicPath = getBasePath(env.outputDir)

export function startServer () {
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
  log.startServer(params.port)
}  