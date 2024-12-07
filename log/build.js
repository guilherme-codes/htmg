/**
 * Log messages for building step
 */
import * as F from './format.js'
import messages from './messages.js'

export function compileLayoutsError(error) {
  F.formatError(
    messages.BUILD_LAYOUTS_ERROR(),
    error
  )

  process.exit(1)
}

export function indexNotFoundError(layoutName) {
  F.formatError(
    messages.INDEX_NOT_FOUND_ERROR(layoutName)
  )

  process.exit(1)
}

export function compileLayoutFilesError(layoutName, error) {
  F.formatError(
    messages.BUILD_LAYOUT_FILES_ERROR(layoutName),
    error
  )
}

export function writeOutputFileError(file, error) {
  F.formatError(
    messages.WRITE_OUTPUT_FILE_ERROR(file),
    error
  )

  process.exit(1)
}

export function insertHtmlIntoLayoutError(layoutName, error) {
  F.formatError(
    messages.INSERT_HTML_INTO_LAYOUT_ERROR(layoutName),
    error
  )

  process.exit(1)
}

export function compileMarkdownFilesError(error) {
  F.formatError(
    messages.BUILD_MARKDOWN_FILES_ERROR(),
    error
  )

  process.exit(1)
}

export function pagesBuildSuccess() {
  F.formatInfo(messages.PAGES_BUILD_SUCCESS())
}

export function buildingLayout(layoutName) {
  F.formatInfo(messages.BUILDING_LAYOUT(layoutName))
}

export function allLayoutsBuilt() {
  F.formatSuccess(messages.ALL_LAYOUTS_BUILT())
}

export function creatingFile(file) {
  F.formatInfo(messages.CREATING_FILE(file))
}


export function startServer(port) {
  F.formatInfoHighlight(messages.WELCOME())
  F.formatInfo(messages.STARTING_SERVER(port))
}

export function buildAssetsError(error) {
  F.formatError(
    messages.BUILD_ASSETS_ERROR(),
    error
  )

  process.exit(1)
}