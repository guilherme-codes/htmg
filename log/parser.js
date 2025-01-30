/**
 * Log messages for parsing step
 */
import * as F from './handle.js'
import messages from './messages.js'

export function parserFileContentError(directory, error) {
  F.handleError(
    messages.PARSER_FILE_CONTENT_ERROR(),
    error
  )
}

export function parserPartialsError(partialName, error) {
  F.handleError(
    messages.PARSER_PARTIALS_ERROR(partialName),
    error
  )
}


export function parserPartialNotFound(partialName) {
  F.handleError(
    messages.PARSER_PARTIAL_NOT_FOUND(partialName)
  )
}

export function parserCircularDependencyError(partialName) {
  F.handleError(
    messages.PARSER_CIRCULAR_DEPENDENCY_ERROR(partialName)
  )
}

export function parsingPage(file) {
  F.handleInfo(
    messages.PARSING_PAGE(file),
  )
}