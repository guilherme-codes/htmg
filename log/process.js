import envs from '../utils/environment.js'
import { getExecBasePath } from '../utils/path.js'
import fs from 'fs'

export function processCleanUp() {
  const output = getExecBasePath(envs.outputDir)

  fs.rmSync(output, { recursive: true, force: true })
  process.exit(1)
}