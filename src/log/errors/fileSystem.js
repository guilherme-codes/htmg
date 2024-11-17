import errorMessages from './messages.js'
import formatError from './format.js'

export function accessPathError(path, error) {
  formatError(
    errorMessages.ACCESS_PATH_ERROR(path),
    error
  )

  process.exit(1)
}

export function readFileError(file, error) {
  formatError(
    errorMessages.READ_FILE_ERROR(file),
    error
  )
  
  process.exit(1)
}

export function readDirectoryError(directory, error) {
  formatError(
    errorMessages.READ_DIRECTORY_ERROR(directory),
    error
  )

  process.exit(1)
}

export function readDirectoryContentError(directory, error) {
  formatError(
    errorMessages.READ_DIRECTORY_CONTENT_ERROR(directory),
    error
  )

  process.exit(1)
}