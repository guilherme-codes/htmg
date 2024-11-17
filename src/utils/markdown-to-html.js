import Showdown from 'showdown'

const converter = new Showdown.Converter()

/**
 * Converts markdown content to HTML.
 * @param {string} content - The markdown content to be converted.
 * @returns {string} The converted HTML content.
 */
export function markdownToHtml(content) {
  return converter.makeHtml(content)
}