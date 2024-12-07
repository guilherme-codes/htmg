/**
 * This file centralizes all the log messages that are used in the application.
 */

const logMessages = {
  // read errors
  ACCESS_PATH_ERROR: (path) => `Error: accessing path: ${path}`,
  READ_FILE_ERROR: (file) => `Error: reading file: ${file}`,
  READ_DIRECTORY_ERROR: (directory) => `Error: reading directory: ${directory}`,
  READ_DIRECTORY_CONTENT_ERROR: (directory) => `Error: reading directory content: ${directory}`,
  READ_DIRECTORY_FILES_ERROR: (directory) => `Error: reading directory files: ${directory}`,
  READ_LAYOUTS_ERROR: (basePath) => `Error: reading layouts from path: ${basePath}`,
  READ_MARKDOWN_FILES_ERROR: (basePath) => `Error: reading markdown files from path: ${basePath}`,
  
  //parser errors
  PARSER_FILE_CONTENT_ERROR: () => 'Error: parsing file content',
  PARSER_PARTIALS_ERROR: (partialName) => `Error: parsing partial ${partialName}`,
  PARSER_PARTIAL_NOT_FOUND: (partialName) => `Error: partial not found ${partialName}`,
  PARSER_CIRCULAR_DEPENDENCY_ERROR: (partialName) => `Error: circular dependency found in partial ${partialName}`,

  // build errors
  BUILD_LAYOUTS_ERROR: () => 'Error: compiling layouts',
  BUILD_MARKDOWN_FILES_ERROR: () => 'Error: compiling markdown files',
  INDEX_NOT_FOUND_ERROR: (layoutName) => `Error: layout "${layoutName}" does not have an index.html file`,
  BUILD_LAYOUT_FILES_ERROR: (layoutName) => `Error: compiling layout files for "${layoutName}"`,
  WRITE_OUTPUT_FILE_ERROR: (file) => `Error: creating page ${file}`,
  INSERT_HTML_INTO_LAYOUT_ERROR: (layoutName) => `Error: inserting HTML into layout "${layoutName}"`,
  BUILD_ASSETS_ERROR: () => 'Error: building assets',

  // success and info alerts
  PAGES_BUILD_SUCCESS: () => 'All pages built successfully!',
  BUILDING_LAYOUT: (layoutName) => `Building ${layoutName} layout`,
  ALL_LAYOUTS_BUILT: () => 'All layouts built successfully!',
  PARSING_PAGE: (file) => `Parsing page file: ${file}`,
  CREATING_FILE: (file) => `Creating file: ${file}`,
  WELCOME: () => 'Welcome to static Donkey. You\'re on dev mode now!',
  STARTING_SERVER: (port) => `Server started at http://localhost:${port}`,
}

export default logMessages
