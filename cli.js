#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import * as log from './log/index.js'
import { CommandType } from './utils/constants.js'

const __filename = fileURLToPath(import.meta.url)
const baseDir =  path.dirname(__filename)

async function run () {
  const [,, command] = process.argv
  const selectedCommand = getCommand(command)

  if (!selectedCommand) {
    log.commandNotFound(command)
    
  }

  await selectedCommand()
}

function getCommand (command) {
  const options  = {
    init: async () => {
      await executeCommand(path.join(baseDir, 'init.js'))
    },
    dev: async () => {
      process.env.COMMAND = CommandType.dev
      
      await executeCommand(path.join(baseDir, 'build.js'))
      await executeCommand(path.join(baseDir, 'dev.js'))
    },
    build: async () => {
      process.env.COMMAND = CommandType.build

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
    
  }
}


run().catch(error => {
  log.unexpectedError(error.message)
  
})
