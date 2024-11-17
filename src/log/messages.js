const errorMessages = {
  // reader errors
  ACCESS_PATH_ERROR: (path) => `Error on accessing path: ${path}`,
  READ_FILE_ERROR: (file) => `Error on reading file: ${file}`,
  READ_DIRECTORY_ERROR: (directory) => `Error on reading directory: ${directory}`,
  READ_DIRECTORY_CONTENT_ERROR: (directory) => `Error on reading directory content: ${directory}`,
  READ_DIRECTORY_FILES_ERROR: (directory) => `Error on reading directory files: ${directory}`,
  READ_LAYOUTS_ERROR: (basePath) => `Error on reading layouts from path: ${basePath}`,
  
  //parser errors
  PARSER_FILE_CONTENT_ERROR: () => 'Error on parsing file content',
  PARSER_PARTIALS_ERROR: (partialName) => `Error on parsing partial: ${partialName}`,
}

export default errorMessages
