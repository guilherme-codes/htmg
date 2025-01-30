/*
  This file contains functions to format log messages applying colors and emojis.
**/

import chalk from 'chalk'
import { processCleanUp } from './process.js'

export function handleError(customMessage, error) {
  let formattedMessage = chalk.red(customMessage)

  if (process.stdout.isTTY) {
    formattedMessage = `❌ ${formattedMessage}`
  }

  console.log(formattedMessage)


  if (error) {
    console.log('\n')
    console.log(chalk.gray(error.stack))
    console.log('\n')
  }

  processCleanUp()
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