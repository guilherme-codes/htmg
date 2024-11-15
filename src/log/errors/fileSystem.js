import errorMessages from './messages.js'
import formatError from './format.js'

export function accessPathError(path, error) {
  return formatError(
    errorMessages.ACCESS_PATH_ERROR(path),
    error
  )
}

export function readFileError(file, error) {
  return formatError(
    errorMessages.READ_FILE_ERROR(file),
    error
  )
}