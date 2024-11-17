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

export function compileLayoutFilesError(layoutName, error) {
  formatError(
    errorMessages.COMPILE_LAYOUT_FILES_ERROR(layoutName),
    error
  )
}

export function writeOutputFileError(file, error) {
  formatError(
    errorMessages.WRITE_OUTPUT_FILE_ERROR(file),
    error
  )

  process.exit(1)
}

export function insertHtmlIntoLayoutError(layoutName, error) {
  formatError(
    errorMessages.INSERT_HTML_INTO_LAYOUT_ERROR(layoutName),
    error
  )

  process.exit(1)
}

export function compileMarkdownFilesError(error) {
  formatError(
    errorMessages.COMPILE_MARKDOWN_FILES_ERROR(),
    error
  )

  process.exit(1)
}