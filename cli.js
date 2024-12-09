#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import * as log from './log/index.js'

const __filename = fileURLToPath(import.meta.url)
const baseDir =  path.dirname(__filename)

async function run () {
  const [,, command] = process.argv
  const selectedCommand = getCommand(command)

  if (!selectedCommand) {
    log.commandNotFound(command)
    process.exit(1)
  }

  await selectedCommand()
}

function getCommand (command) {
  const options  = {
    init: async () => {
      await executeCommand(path.join(baseDir, 'init.js'))
    },
    dev: async () => {
      await executeCommand(path.join(baseDir, 'build.js'))
      await executeCommand(path.join(baseDir, 'dev.js'))
    },
    build: async () => {
      await executeCommand(path.join(baseDir, 'build.js'))
    },
    '--help': () => log.help()
  }

  return options[command]
}

async function executeCommand(scriptPath) {
  try {
    await import(scriptPath)
  } catch (error) {
    console.log(error)
    log.unexpectedError(error.message)
    process.exit(1)
  }
}


run().catch(error => {
  log.unexpectedError(error.message)
  process.exit(1)
})
