import formatError from './format.js'
import errorMessages from './messages.js'

export function compileLayoutsError(error) {
  formatError(
    errorMessages.COMPILE_LAYOUTS_ERROR(),
    error
  )

  process.exit(1)
}