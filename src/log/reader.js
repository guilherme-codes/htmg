import messages from './messages.js'
import {formatError} from './format.js'

export function accessPathError(path, error) {
  formatError(
    messages.ACCESS_PATH_ERROR(path),
    error
  )

  process.exit(1)
}

export function readFileError(file, error) {
  formatError(
    messages.READ_FILE_ERROR(file),
    error
  )
  
  process.exit(1)
}

export function readDirectoryError(directory, error) {
  formatError(
    messages.READ_DIRECTORY_ERROR(directory),
    error
  )

  process.exit(1)
}

export function readDirectoryContentError(directory, error) {
  formatError(
    messages.READ_DIRECTORY_CONTENT_ERROR(directory),
    error
  )

  process.exit(1)
}

export function readDirectoryFilesError(directory, error) {
  formatError(
    messages.READ_DIRECTORY_FILES_ERROR(directory),
    error
  )

  process.exit(1)
}

export function readLayoutsError(basePath, error) {
  formatError(
    messages.READ_LAYOUTS_ERROR(basePath),
    error
  )

  process.exit(1)
}