/**
 * Log messages for parsing step
 */
import {formatError, formatInfo} from './format.js'
import messages from './messages.js'

export function parserFileContentError(directory, error) {
  formatError(
    messages.PARSER_FILE_CONTENT_ERROR(),
    error
  )

  process.exit(1)
}

export function parserPartialsError(partialName, error) {
  formatError(
    messages.PARSER_PARTIALS_ERROR(partialName),
    error
  )

  process.exit(1)
}


export function parserPartialNotFound(partialName) {
  formatError(
    messages.PARSER_PARTIAL_NOT_FOUND(partialName)
  )

  process.exit(1)
}

export function parserCircularDependencyError(partialName) {
  formatError(
    messages.PARSER_CIRCULAR_DEPENDENCY_ERROR(partialName)
  )

  process.exit(1)
}

export function parsingMarkdownFiles(file) {
  formatInfo(
    messages.PARSING_MARKDOWN_FILES(file),
  )
}