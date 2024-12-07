/**
 * This module provides a function to generate a sitemap for a website.
 */

import fs from 'fs'
import path from 'path'
import xml2js from 'xml2js'

const DEFAULT_OPTIONS = {
  changefreq: 'weekly',
  priority: 0.8,
  outFile: 'sitemap.xml'
}

/**
 * @typedef {Object} SitemapOptions
 * @property {string} changefreq - Frequency of page changes
 * @property {number} priority - Page priority (0.0 to 1.0)
 * @property {string} outFile - Output file path
 */

/**
 * @typedef {Object} SitemapResult
 * @property {number} urlCount - Number of URLs in sitemap
 * @property {string} filePath - Path to generated sitemap file
 */

/**
 * @typedef {Object} UrlEntry
 * @property {string} loc - Full URL of the page
 * @property {string} lastmod - Last modification date in ISO format
 * @property {string} changefreq - Change frequency
 * @property {number} priority - Page priority
 */

/**
 * Creates a URL entry for the sitemap
 * @param {string} baseUrl - Base URL of the website
 * @param {string} relativePath - Relative path to the file
 * @param {Date} lastModified - Last modification date
 * @param {SitemapOptions} options - Sitemap configuration
 * @returns {UrlEntry}
 */
function createUrlEntry(baseUrl, relativePath, lastModified, options) {
  const urlPath = formatUrlPath(relativePath)
  return {
    loc: `${baseUrl}/${urlPath}`,
    lastmod: lastModified.toISOString(),
    changefreq: options.changefreq,
    priority: options.priority
  }
}

/**
 * Formats the URL path by normalizing separators and removing index.html
 * @param {string} relativePath - Relative path to format
 * @returns {string}
 */
function formatUrlPath(relativePath) {
  return relativePath
    .replace(/\\/g, '/')
    .replace(/index\.html$/, '')
}

/**
 * Recursively scans directory for HTML files
 * @param {string} dir - Directory to scan
 * @param {string} baseDir - Base directory for relative path calculation
 * @param {string} baseUrl - Base URL of the website
 * @param {SitemapOptions} options - Sitemap configuration
 * @returns {UrlEntry[]}
 */
function scanDirectory(dir, baseDir, baseUrl, options) {
  const urls = []
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stats = fs.statSync(fullPath)

    if (stats.isDirectory()) {
      urls.push(...scanDirectory(fullPath, baseDir, baseUrl, options))
    } else if (file.endsWith('.html')) {
      const relativePath = path.relative(baseDir, fullPath)
      urls.push(createUrlEntry(baseUrl, relativePath, new Date(stats.mtime), options))
    }
  }

  return urls
}

/**
 * Generates sitemap XML structure
 * @param {UrlEntry[]} urls - Array of URL entries
 * @returns {Object}
 */
function generateSitemapStructure(urls) {
  return {
    urlset: {
      $: {
        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
      },
      url: urls
    }
  }
}

/**
 * Builds a sitemap for the specified directory
 * @param {string} baseDir - Root directory to scan
 * @param {string} baseUrl - Base URL of the website
 * @param {Partial<SitemapOptions>} options - Optional configuration
 * @returns {SitemapResult}
 */
export function buildSitemap(baseDir, baseUrl, options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options }
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '')
  config.outFile = path.join(baseDir, config.outFile)

  const urls = scanDirectory(baseDir, baseDir, normalizedBaseUrl, config)
  const sitemap = generateSitemapStructure(urls)

  const builder = new xml2js.Builder()
  const xml = builder.buildObject(sitemap)

  fs.writeFileSync(config.outFile, xml)

  return {
    urlCount: urls.length,
    filePath: config.outFile
  }
}