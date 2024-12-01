import {formatError, formatInfo} from './format.js'
import messages from './messages.js'

export function compileLayoutsError(error) {
  formatError(
    messages.BUILD_LAYOUTS_ERROR(),
    error
  )

  process.exit(1)
}

export function indexNotFoundError(layoutName) {
  formatError(
    messages.INDEX_NOT_FOUND_ERROR(layoutName)
  )

  process.exit(1)
}

export function compileLayoutFilesError(layoutName, error) {
  formatError(
    messages.BUILD_LAYOUT_FILES_ERROR(layoutName),
    error
  )
}

export function writeOutputFileError(file, error) {
  formatError(
    messages.WRITE_OUTPUT_FILE_ERROR(file),
    error
  )

  process.exit(1)
}

export function insertHtmlIntoLayoutError(layoutName, error) {
  formatError(
    messages.INSERT_HTML_INTO_LAYOUT_ERROR(layoutName),
    error
  )

  process.exit(1)
}

export function compileMarkdownFilesError(error) {
  formatError(
    messages.BUILD_MARKDOWN_FILES_ERROR(),
    error
  )

  process.exit(1)
}

export function buildSuccess() {
  formatInfo(messages.BUILD_SUCCESS())
}