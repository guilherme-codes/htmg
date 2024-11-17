import formatError from './format.js'
import errorMessages from './messages.js'

export function compileLayoutsError(error) {
  formatError(
    errorMessages.COMPILE_LAYOUTS_ERROR(),
    error
  )

  process.exit(1)
}

export function indexNotFoundError(layoutName) {
  formatError(
    errorMessages.INDEX_NOT_FOUND_ERROR(layoutName)
  )

  process.exit(1)
}