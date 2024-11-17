const errorMessages = {
  ACCESS_PATH_ERROR: (path) => `Error accessing path: ${path}`,
  READ_FILE_ERROR: (file) => `Error reading file: ${file}`,
  READ_DIRECTORY_ERROR: (directory) => `Error reading directory: ${directory}`,
  READ_DIRECTORY_CONTENT_ERROR: (directory) => `Error reading directory content: ${directory}`,
}

export default errorMessages
