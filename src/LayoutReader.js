import { promises as fs } from 'fs';
import path from 'path';

class LayoutReader {
    constructor(basePath) {
        this.validateBasePath(basePath);
        this.basePath = basePath;
    }

    /**
     * Reads all layout files from the base directory
     * @returns {Promise<Object>} Layout contents organized by directory
     */
    async readLayouts() {
      const directories = await this.getLayoutDirectories();
      const layoutContents = await this.processDirectories(directories);
      return this.buildLayoutObject(layoutContents);
    }

    /**
     * Validates if the provided base path exists and is accessible
     * @throws {Error} If path is invalid or inaccessible
     */
    async validateBasePath(basePath) {
        try {
            await fs.access(basePath);
        } catch (error) {
            throw new Error(`Invalid or inaccessible layout directory: ${basePath}`);
        }
    }


    /**
     * Gets all directory entries from the base path
     * @returns {Promise<Array>} Array of directory entries
     */
    async getLayoutDirectories() {
        const entries = await fs.readdir(this.basePath, { withFileTypes: true });
        return entries.filter(entry => entry.isDirectory());
    }

    /**
     * Processes all directories in parallel
     * @param {Array} directories Array of directory entries
     * @returns {Promise<Array>} Array of processed directory contents
     */
    async processDirectories(directories) {
        const directoryPromises = directories.map(dir => 
            this.processDirectory(dir)
        );
        return Promise.all(directoryPromises);
    }

    /**
     * Processes a single directory
     * @param {Dirent} directory Directory entry
     * @returns {Promise<Array>} Directory name and its processed contents
     */
    async processDirectory(directory) {
        const dirPath = this.buildDirectoryPath(directory.name);
        const files = await fs.readdir(dirPath);
        const contents = await this.processFiles(files, dirPath);
        return [directory.name, contents];
    }

    /**
     * Processes all files in a directory in parallel
     * @param {Array} files Array of file names
     * @param {string} dirPath Path to the directory
     * @returns {Promise<Object>} Object containing file contents
     */
    async processFiles(files, dirPath) {
        const filePromises = files.map(file => 
            this.processFile(file, dirPath)
        );
        const fileContents = await Promise.all(filePromises);
        return Object.fromEntries(fileContents);
    }

    /**
     * Processes a single file
     * @param {string} file File name
     * @param {string} dirPath Path to the directory
     * @returns {Promise<Array>} File name and its contents
     */
    async processFile(file, dirPath) {
        const filePath = this.buildFilePath(dirPath, file);
        const content = await this.readFileContent(filePath);
        return [this.getFileBaseName(file), content];
    }

    /**
     * Reads the content of a file
     * @param {string} filePath Path to the file
     * @returns {Promise<string>} File contents
     */
    async readFileContent(filePath) {
        return fs.readFile(filePath, 'utf-8');
    }

    /**
     * Builds the complete directory path
     * @param {string} dirName Directory name
     * @returns {string} Complete directory path
     */
    buildDirectoryPath(dirName) {
        return path.join(this.basePath, dirName);
    }

    /**
     * Builds the complete file path
     * @param {string} dirPath Directory path
     * @param {string} fileName File name
     * @returns {string} Complete file path
     */
    buildFilePath(dirPath, fileName) {
        return path.join(dirPath, fileName);
    }

    /**
     * Gets the base name of a file (without extension)
     * @param {string} fileName File name
     * @returns {string} File base name
     */
    getFileBaseName(fileName) {
        return path.parse(fileName).name;
    }

    /**
     * Builds the final layout object from processed contents
     * @param {Array} layoutContents Array of processed contents
     * @returns {Object} Final layout object
     */
    buildLayoutObject(layoutContents) {
        return Object.fromEntries(layoutContents);
    }
}

export default LayoutReader;