/**
 * Logs for CLI commands
 */

import * as F from './handler.js'
import messages from './messages.js'

export function commandNotFound(command) {
  return F.handleError(
    messages.COMMAND_NOT_FOUND(command)
  )
}

export function unexpectedError(error) {
  return F.handleError(
    messages.UNEXPECTED_ERROR(),
    error
  )
}

export function help() {
  console.log(`
${F.handleRemarks('Available commands')}

  ${F.handleRemarks('dev')}   Inits the development server

  ${F.handleRemarks('build')}   Builds the project

  ${F.handleRemarks('--help')}   Shows this help message
`)
}