import formatError from './format.js'
import errorMessages from './messages.js'

export function parserFileContentError(directory, error) {
  formatError(
    errorMessages.PARSER_FILE_CONTENT_ERROR(),
    error
  )

  process.exit(1)
}

export function parserPartialsError(partialName, error) {
  formatError(
    errorMessages.PARSER_PARTIALS_ERROR(partialName),
    error
  )

  process.exit(1)
}
