/**
 * Logs for CLI commands
 */

import * as F from './format.js'
import messages from './messages.js'

export function commandNotFound(command) {
  return F.formatError(
    messages.COMMAND_NOT_FOUND(command)
  )
}

export function unexpectedError(error) {
  return F.formatError(
    messages.UNEXPECTED_ERROR(),
    error
  )
}

export function help() {
  console.log(`
${F.formatRemarks('Available commands')}

  ${F.formatRemarks('dev')}   Inits the development server

  ${F.formatRemarks('build')}   Builds the project

  ${F.formatRemarks('--help')}   Shows this help message
`)
}