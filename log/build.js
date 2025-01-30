/**
 * Log messages for building step
 */
import * as F from './handler.js'
import messages from './messages.js'

export function compileLayoutsError(error) {
  F.handleError(
    messages.BUILD_LAYOUTS_ERROR(),
    error
  )
}

export function indexNotFoundError(layoutName) {
  F.handleError(
    messages.INDEX_NOT_FOUND_ERROR(layoutName)
  )
}

export function compileLayoutFilesError(layoutName, error) {
  F.handleError(
    messages.BUILD_LAYOUT_FILES_ERROR(layoutName),
    error
  )
}

export function writeOutputFileError(file, error) {
  F.handleError(
    messages.WRITE_OUTPUT_FILE_ERROR(file),
    error
  )
}

export function insertHtmlIntoLayoutError(layoutName, error) {
  F.handleError(
    messages.INSERT_HTML_INTO_LAYOUT_ERROR(layoutName),
    error
  )
}

export function compileMarkdownFilesError(error) {
  F.handleError(
    messages.BUILD_MARKDOWN_FILES_ERROR(),
    error
  )
}

export function pagesBuildSuccess() {
  F.handleSuccess(messages.PAGES_BUILD_SUCCESS())
}

export function buildingLayout(layoutName) {
  F.handleInfo(messages.BUILDING_LAYOUT(layoutName))
}

export function allLayoutsBuilt() {
  F.handleSuccess(messages.ALL_LAYOUTS_BUILT())
}

export function creatingFile(file) {
  F.handleInfo(messages.CREATING_FILE(file))
}


export function startServer(port) {
  F.handleHighlight(messages.WELCOME())
  F.handleInfo(messages.STARTING_SERVER(port))
}
export function processingAssets() {
  F.handleInfo(messages.PROCESSING_ASSETS())
}

export function buildAssetsError(error) {
  F.handleError(
    messages.BUILD_ASSETS_ERROR(),
    error
  )
}

export function buildingSitemap() {
  F.handleInfo(messages.SITEMAP_BUILDING())
}

export function buildingSitemapError(error) {
  F.handleError(
    messages.ERRO_BUILDING_SITEMAP(),
    error
  )
}

export function buildComplete() {
  console.log('\n')
  F.handleSuccess(messages.BUILD_COMPLETE())
}

export function createOutputDirError(error) {
  F.handleError(
    messages.CREATE_OUTPUT_DIR_ERROR(),
    error
  )
}

export function cleaningOutputDir() {
  F.handleInfo(messages.CLEANING_OUTPUT_DIR())
}

export function minifyingCSS(file) {
  F.handleInfo(messages.MINIFY_CSS(file))
}

export function minifyingJS(file) {
  F.handleInfo(messages.MINIFY_JS(file))
}