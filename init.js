import { promises as fs } from 'fs'
import path from 'path'
import { getExecBasePath } from './utils/path.js'
import readline from 'readline'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { basePackageJson } from './utils/base.package.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



async function npmInit() {
  const packageJsonPath = getExecBasePath('package.json')
  
  try {
    await fs.access(packageJsonPath)
    console.log('Error: There is already a package.json file in this directory.')
    process.exit(1)
  } catch {
    initializeProject()
  }
}

async function initializeProject() {
  const projectName = await askQuestion('What is the name of your project? ')
  
  try {
    console.log('Initializing project...')
    console.log('\n')
    await addPackageJson(projectName)
    await copyBaseTemplate()
    await spawn('npm', ['install'], { 
      cwd: getExecBasePath(),
      stdio: 'inherit'  
    })

  } catch (error) {
    console.error('Error:', error)
  }
}

async function addPackageJson(projectName) {
  const packageJsonPath = getExecBasePath('package.json')
  const packageJson = {name: projectName, ...basePackageJson}

  try {
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
  } catch (error) {
    console.error('Error:', error)
  }
}

async function copyBaseTemplate() {
  const templatePath = path.join(__dirname, 'template')
  const files = await fs.readdir(templatePath)

  try {
    await Promise.all(files.map(file => 
      fs.cp(
        path.join(templatePath, file), 
        `${getExecBasePath(file)}`, 
        { recursive: true }
      )
    ))
  } catch (error) {
    console.error('Error:', error)
  }
}

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}


npmInit()