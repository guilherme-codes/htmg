import { promises as fs } from 'fs'
import path from 'path'
import { getExecBasePath } from './utils/path.js'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { basePackageJson } from './utils/base.package.js'
import * as log from './log/index.js'
import { askQuestion } from './utils/prompt.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Runs the initialization process for the project.
 * Checks if the package.json file exists and exits with an error if it does.
 * Otherwise, initializes the project.
 */
async function run() {
  const packageJsonPath = getExecBasePath('package.json')
  
  try {
    await fs.access(packageJsonPath)

    log.repositoryExistsError()
    process.exit(1)
  } catch {
    initializeProject()
  }
}

/**
 * Initializes the project by asking for the project name, adding a package.json file,
 * copying the base template, and installing the required dependencies.
 * 
 * @returns {Promise<void>} A promise that resolves when the project initialization is complete.
 */
async function initializeProject() {
  const projectName = await askQuestion(log.askProjectName())
  
  try {
    log.initializingProject()

    await addPackageJson(projectName)
    await copyBaseTemplate()
    await spawn('npm', ['install'], { 
      cwd: getExecBasePath(),
      stdio: 'inherit'  
    })

  } catch (error) {
    log.unexpectedError(error)
  }
}

/**
 * Adds a package.json file to the project with the specified name.
 * @param {string} projectName - The name of the project.
 * @returns {Promise<void>} - A promise that resolves when the package.json file is successfully written.
 */
async function addPackageJson(projectName) {
  const packageJsonPath = getExecBasePath('package.json')
  const packageJson = {name: projectName, ...basePackageJson}

  try {
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
  } catch (error) {
    log.unexpectedError(error)
  }
}

/**
 * Copies files from a template directory to the execution base path.
 * @returns {Promise<void>} A promise that resolves when the files are copied successfully, 
 * or rejects with an error.
 */
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
    log.unexpectedError(error)
  }
}

run()