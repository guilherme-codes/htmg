/**
 * Log messages for reading files step
 */

import messages from './messages.js'
import * as F from './handle.js'

export function accessPathError(path, error) {
  F.handleError(
    messages.ACCESS_PATH_ERROR(path),
    error
  )
}

export function readFileError(file, error) {
  F.handleError(
    messages.READ_FILE_ERROR(file),
    error
  )
}

export function readDirectoryError(directory, error) {
  F.handleError(
    messages.READ_DIRECTORY_ERROR(directory),
    error
  ) 
}

export function readDirectoryContentError(directory, error) {
  F.handleError(
    messages.READ_DIRECTORY_CONTENT_ERROR(directory),
    error
  ) 
}

export function readDirectoryFilesError(directory, error) {
  F.handleError(
    messages.READ_DIRECTORY_FILES_ERROR(directory),
    error
  )
}

export function readLayoutsError(basePath, error) {
  F.handleError(
    messages.READ_LAYOUTS_ERROR(basePath),
    error
  )
}