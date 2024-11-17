const errorMessages = {
  // reader errors
  ACCESS_PATH_ERROR: (path) => `Error accessing path: ${path}`,
  READ_FILE_ERROR: (file) => `Error reading file: ${file}`,
  READ_DIRECTORY_ERROR: (directory) => `Error reading directory: ${directory}`,
  READ_DIRECTORY_CONTENT_ERROR: (directory) => `Error reading directory content: ${directory}`,
  READ_DIRECTORY_FILES_ERROR: (directory) => `Error reading directory files: ${directory}`,
  READ_LAYOUTS_ERROR: (basePath) => `Error reading layouts from path: ${basePath}`
  
  //parser errors
}

export default errorMessages
