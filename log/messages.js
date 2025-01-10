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
  BUILD_ASSETS_ERROR: () => 'Error: building public assets',
  CREATE_OUTPUT_DIR_ERROR: () => 'Error: creating output directory',

  //build
  PAGES_BUILD_SUCCESS: () => 'All pages built successfully!',
  BUILDING_LAYOUT: (layoutName) => `Building ${layoutName} layout`,
  ALL_LAYOUTS_BUILT: () => 'All layouts built successfully!',
  PARSING_PAGE: (file) => `Parsing page file: ${file}`,
  CREATING_FILE: (file) => `Creating file: ${file}`,
  WELCOME: () => 'Welcome to HTMG. You\'re on dev mode now!',
  STARTING_SERVER: (port) => `Server started at http://localhost:${port}`,
  BUILD_COMPLETE: () => 'Build complete!',
  CLEANING_OUTPUT_DIR: () => 'Cleaning output directory...',

  // commands
  COMMAND_NOT_FOUND: (command) => `Unknown command: ${command}. Use --help to see available commands`,
  UNEXPECTED_ERROR: () => 'Unexpected Error',

  // init
  INITIALIZING_PROJECT: () => 'Initializing project...',
  ASK_PROJECT_NAME: () => 'What is the name of your project? ',
  ERROR_REPOSITORY_EXISTS: () => 'There is already a package.json file in this directory.',
  ERROR_PROJECT_NAME_REQUIRED: () => 'Project name is required.',
  ERROR_INVALID_PROJECT_NAME: () => 'Invalid project name.',

  // assets
  PROCESSING_ASSETS: () => 'Processing public assets...',

  // sitemap
  SITEMAP_BUILDING: () => 'Building sitemap...',
  ERRO_BUILDING_SITEMAP: () => 'Error building sitemap',
  
}

export default logMessages
