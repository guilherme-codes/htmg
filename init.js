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

    await initializeGit(projectName)
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
    
  } else if (projectTitleRegex.test(projectName)) {
    log.invalidProjectName()
    
  }
}

/**
 * Adds a package.json file to the project with the specified name.
 * @param {string} projectName - The name of the project.
 * @returns {Promise<void>} - A promise that resolves when the package.json file is successfully written.
 */
async function addPackageJson(projectName) {
  const packageJsonPath = getExecBasePath(path.join(projectName, 'package.json'))
  const packageName = projectName === '.'  ? path.basename(process.cwd()) : projectName
  const packageJson = {name: packageName, ...basePackageJson}

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
    const isEmpty = await isDirectoryEmpty()

    if (!isEmpty) {
      log.directoryNotEmptyError()
    }

    return
  }
  
  try {
    await fs.mkdir(getExecBasePath(projectName))
  } catch (error) {
    log.unexpectedError(error)
  }
}

/**
 * Checks if the current directory is empty.
 *
 * This function reads the contents of the current directory and filters out
 * any hidden files (files starting with a dot). It returns true if there are
 * no visible files in the directory, and false otherwise.
 *
 * @async
 * @function isDirectoryEmpty
 * @returns {Promise<boolean>} A promise that resolves to true if the directory is empty, false otherwise.
 * @throws {Error} If there is an error reading the directory, other than the directory not existing.
 */
async function isDirectoryEmpty() {
  try {
    const dirContents = await fs.readdir('.')
    const visibleFiles = dirContents.filter(file => !file.startsWith('.'))

    return visibleFiles.length === 0
  } catch (error) {
    return error.code === 'ENOENT'
  }
}

/**
 * Checks if Git is installed on the system by running the 'git --version' command.
 * 
 * @returns {Promise<boolean>} A promise that resolves to true if Git is installed, otherwise false.
 */
async function checkGitInstalled() {
  return new Promise((resolve) => {
    const process = spawn('git', ['--version'])

    process.on('error', () => resolve(false))
    process.on('close', (code) => resolve(code === 0))
  })
}

/**
 * Initializes a new Git repository in the specified project directory.
 *
 * @param {string} projectName - The name of the project directory where the Git repository will be initialized.
 * @returns {Promise<void>} A promise that resolves when the Git repository has been initialized.
 */
async function initializeGit(projectName) {
  const gitInstalled = await checkGitInstalled()

  if (gitInstalled) {
    await spawn('git', ['init'], 
      { 
        cwd: getExecBasePath(projectName), 
        stdio: 'inherit' 
      }
    )
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