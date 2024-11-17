const errorMessages = {
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
  PARSER_PARTIALS_ERROR: (partialName) => `Error: parsing partial: ${partialName}`,

  // build errors
  BUILD_LAYOUTS_ERROR: () => 'Error: compiling layouts',
  BUILD_MARKDOWN_FILES_ERROR: () => 'Error: compiling markdown files',
  INDEX_NOT_FOUND_ERROR: (layoutName) => `Error: layout "${layoutName}" does not have an index.html file`,
  BUILD_LAYOUT_FILES_ERROR: (layoutName) => `Error: compiling layout files for "${layoutName}"`,
  WRITE_OUTPUT_FILE_ERROR: (file) => `Error: creating page ${file}`,
  INSERT_HTML_INTO_LAYOUT_ERROR: (layoutName) => `Error: inserting HTML into layout "${layoutName}"`,
}

export default errorMessages
