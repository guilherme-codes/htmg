/*
  This file contains functions to format log messages applying colors and emojis.
**/

import chalk from 'chalk'
import { processCleanUp } from './process.js'

/**
 * Handles and logs errors with optional cleanup.
 *
 * @param {string} customMessage - The custom error message to display.
 * @param {Error} [error=undefined] - The error object containing the stack trace.
 * @param {boolean} [cleanUp=true] - Whether to perform cleanup after logging the error.
 */
export function handleError(customMessage, error, cleanUp = true) {
  let formattedMessage = chalk.red(customMessage)

  if (process.stdout.isTTY) {
    formattedMessage = `❌ ${formattedMessage}`
  }

  console.log(formattedMessage)
  console.log('\n')


  if (error) {
    console.log(chalk.gray(error.stack))
    console.log('\n')
  }

  if (cleanUp) {
    processCleanUp()
  }
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