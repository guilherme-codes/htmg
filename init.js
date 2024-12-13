import { promises as fs } from 'fs'
import path from 'path'
import { getExecBasePath } from './utils/path.js'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { basePackageJson } from './utils/base.package.js'
import * as log from './log/index.js'
import { askQuestion } from './utils/prompt.js'
import { projectTitleRegex } from './utils/regex.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


/**
 * Initializes the project by asking for the project name, adding a package.json file,
 * copying the base template, and installing the required dependencies.
 * 
 * @returns {Promise<void>} A promise that resolves when the project initialization is complete.
 */
async function run() {
  const projectName = await askQuestion(log.askProjectName())
  validateProjectName(projectName)

  try {
    log.initializingProject()

    await addPackageJson(projectName)
    await copyBaseTemplate(projectName)
    await spawn('npm', ['install'], { 
      cwd: getExecBasePath(projectName),
      stdio: 'inherit'  
    })

  } catch (error) {
    log.unexpectedError(error)
  }
}

/**
 * Validates the project name.
 * @param {string} projectName - The name of the project.
 */
function validateProjectName(projectName) {
  if (projectName.trim() === '.') {
    return
  } else if (!projectName || projectName.trim() === '') {
    log.projectNameRequired()
    process.exit(1)
  } else if (projectTitleRegex.test(projectName)) {
    log.invalidProjectName()
    process.exit(1)
  }
}

/**
 * Adds a package.json file to the project with the specified name.
 * @param {string} projectName - The name of the project.
 * @returns {Promise<void>} - A promise that resolves when the package.json file is successfully written.
 */
async function addPackageJson(projectName) {
  const packageJsonPath = getExecBasePath(path.join(projectName, 'package.json'))
  const packageJson = {name: projectName, ...basePackageJson}

  try {
    await addDirectory(projectName)
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
  } catch (error) {
    log.unexpectedError(error)
  }
}

/**
 * Creates a new directory for the project.
 *
 * @param {string} projectName - The name of the project directory.
 * @returns {Promise<void>} - A promise that resolves when the directory is created.
 */
async function addDirectory(projectName) {
  if (projectName === '.') {
    return
  }
  
  try {
    await fs.mkdir(getExecBasePath(projectName))
  } catch (error) {
    log.unexpectedError(error)
  }
}

/**
 * Copies files from a template directory to the execution base path.
 * @param {string} projectName - The name of the project
 * @returns {Promise<void>} A promise that resolves when the files are copied successfully, 
 * or rejects with an error.
 */
async function copyBaseTemplate(projectName) {
  const templatePath = path.join(__dirname, 'template')
  const files = await fs.readdir(templatePath)

  try {
    await Promise.all(files.map(file => 
      fs.cp(
        path.join(templatePath, file), 
        `${getExecBasePath(path.join(projectName, file))}`, 
        { recursive: true }
      )
    ))
  } catch (error) {
    log.unexpectedError(error)
  }
}

run()