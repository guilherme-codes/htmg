import Showdown from 'showdown'
import { pipe } from './fn.js'
import { endHeadTagRegex, headTagRegex, markdownHeaderRegex, startHtmlRegex, titleTagRegex } from './regex.js'

const converter = new Showdown.Converter()
function insertBeforeHead(content, tag) {
  return content.replace(endHeadTagRegex, `${tag}\n</head>`)
}

/**
 * Converts markdown content to HTML.
 * @param {string} content - The markdown content to be converted.
 * @returns {string} The converted HTML content.
 */
export function markdownToHtml(content) {
  return converter.makeHtml(content)
}


/**
 * Extracts metadata from a markdown string.
 *
 * @param {string} markdown - The markdown string to extract metadata from.
 * @returns {object|null} - The extracted metadata as an object, or null if no metadata is found.
 */
export function extractMetadata(markdown) {
  const match = markdown.match(markdownHeaderRegex)
  
  if (!match) {
    return null
  }

  const commentContent = match[1]
  const lines = commentContent.trim().split('\n')
  const metadata = extractMetadataItems(lines)
  
  return metadata
}

/**
 * Extracts metadata items from an array of lines.
 *
 * @param {string[]} lines - The array of lines to extract metadata from.
 * @returns {Object} - The extracted metadata as key-value pairs.
 */
function extractMetadataItems (lines) {
  const metadata = {}

  lines.forEach(line => {
    if (line.trim() === '') return
      
    const colonIndex = line.indexOf(':')

    if (colonIndex !== -1) {
      const key = line.substring(0, colonIndex).trim()
      const value = line.substring(colonIndex + 1).trim()
          
      metadata[key] = value
    }
  })

  return metadata
}


/**
 * Process all metadata from markdown files and inject it into the layout.
 *
 * @param {string} layout - The html layout.
 * @param {object} metadata - The metadata to be injected.
 * @returns {string} - The updated layout with injected metadata.
 */
export function injectMarkdownMetadata (layout, metadata) {
  return pipe(
    insertHeadTag,
    layout => insertTitle(metadata, layout),
    layout => insertMetaTags(metadata, layout)
  )(layout)
}
 
/**
 * Inserts a <head> tag into the layout content if it doesn't already exist.
 *
 * @param {string} layoutContent - The layout content to modify.
 * @returns {string} The modified layout content with the <head> tag inserted.
 */
function insertHeadTag(layoutContent) {
  if (headTagRegex.test(layoutContent)) {
    return layoutContent
  }

  return layoutContent.replace(startHtmlRegex, match => `${match}\n<head></head>`)
}

/**
 * Inserts the title metadata into the layout content.
 *
 * @param {Object} metadata - The metadata object containing the title.
 * @param {string} layoutContent - The layout content to insert the title into.
 * @returns {string} The layout content with the title inserted.
 */
function insertTitle(metadata, layoutContent) {
  if (metadata?.title) {
    const titleTag = `<title>${metadata.title}</title>`

    if (titleTagRegex.test(layoutContent)) {
      layoutContent = layoutContent.replace(titleTagRegex, (_, attributes = '') => {
        return `<title${attributes}>${metadata.title}</title>`
      })
    } else {
      layoutContent = insertBeforeHead(layoutContent, titleTag)
    }
  }

  return layoutContent
}


function insertMetaTags(metadata, layoutContent) {
  const metaTagsMap = {
    'meta-title': { type: 'name', property: 'title' },
    'meta-og-title': { type: 'property', property: 'og:title' },
    'meta-twitter-title': { type: 'name', property: 'twitter:title' },
    'meta-description': { type: 'name', property: 'description' },
    'meta-og-description': { type: 'property', property: 'og:description' },
    'meta-twitter-description': { type: 'name', property: 'twitter:description' },
    'meta-keywords': { type: 'name', property: 'keywords' },
    'meta-author': { type: 'name', property: 'author' },
    'meta-og-image': { type: 'property', property: 'og:image' },
    'meta-twitter-image': { type: 'name', property: 'twitter:image' },
    'meta-twitter-card': { type: 'name', property: 'twitter:card' },
    'meta-og-url': { type: 'property', property: 'og:url' },
  }

  for (const [name, { type, property }] of Object.entries(metaTagsMap)) {
    const value = metadata[name]

    if (value) {
      const regex = new RegExp(
        `<meta\s+${type}="${property}"\s+content="[^"]*"\s*/?>`,
        'i'
      )

      if (!regex.test(layoutContent)) {
        const tag = `<meta ${type}="${property}" content="${value}">`
        layoutContent = insertBeforeHead(layoutContent, tag)
      }
    }
  }

  return layoutContent
}
