/*
  This file contains functions to format log messages applying colors and emojis.
**/

import chalk from 'chalk'
import { getExecBasePath } from '../utils/path.js'
import envs from '../utils/environment.js'
import fs from 'fs'


export function handleError(customMessage, error) {
  let formattedMessage = chalk.red(customMessage)

  if (process.stdout.isTTY) {
    formattedMessage = `❌ ${formattedMessage}`
  }

  console.log(formattedMessage)


  if (error) {
    console.log(chalk.gray(error.stack))
  }

  killProcess()
}

function killProcess() {
  const output = getExecBasePath(envs.outputDir)

  fs.rmSync(output, { recursive: true, force: true })
  process.exit(1)
}

export function handleSuccess(customMessage) {
  let formattedMessage = chalk.green(customMessage)

  if (process.stdout.isTTY) {
    formattedMessage = `✅ ${formattedMessage}`
  }

  console.log(formattedMessage)
  console.log('\n')
}

export function handleInfo(customMessage) {
  let formattedMessage = chalk.whiteBright(customMessage)

  if (process.stdout.isTTY) {
    formattedMessage = `🔄   ${formattedMessage}`
  }

  console.log(formattedMessage)
}

export function handleHighlight(customMessage) {
  let formattedMessage = chalk.blueBright(customMessage)
  console.log(formattedMessage)
  console.log('\n')
}

export function handleRemarks(customMessage) {
  let formattedMessage = chalk.magenta(customMessage)
  return formattedMessage
}