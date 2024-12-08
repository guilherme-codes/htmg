import { promises as fs } from 'fs'
import path from 'path'
import env from './utils/environment.js'
import { getBasePath } from './utils/path.js'

const copyTemplates = async () => {
  const files = await fs.readdir(env.templateDir)
  await Promise.all(files.map(file => 
    fs.cp(
      path.join(env.templateDir, file), 
      `${getBasePath(file)}`, 
      { recursive: true }
    )
  ))
}

await copyTemplates()