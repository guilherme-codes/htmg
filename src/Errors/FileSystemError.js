import errorMessages from './errorMessage.js'
import formatError from './formatError.js'

class FileSystemError {
  static accessPathError(path, error) {
    formatError(
      errorMessages.ACCESS_PATH_ERROR(path),
      error
    )
  }
}

export default FileSystemError
