import Showdown from 'showdown'
import { pipe } from './fn.js'
import { endHeadTagRegex, headTagRegex, markdownHeaderRegex, startHtmlRegex, titleTagRegex } from './regex.js'

const converter = new Showdown.Converter()

/**
 * Converts markdown content to HTML.
 * @param {string} content - The markdown content to be converted.
 * @returns {string} The converted HTML content.
 */
export function markdownToHtml(content) {
  return converter.makeHtml(
    content.replace(markdownHeaderRegex, '')
  )
}

export function extractMarkdownMetadata(markdown) {
  const match = markdown.match(markdownHeaderRegex)
  
  if (!match) {
    return null
  }

  const commentContent = match[1]
  const lines = commentContent.trim().split('\n')
  const metadata = extractMetadataItems(lines)
  
  return metadata
}

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


export function injectMarkdownMetadata (layout, metadata) {
  return pipe(
    insertHeadTag,
    layout => insertTitle(metadata, layout)
  )(layout)
}
 
function insertHeadTag(layoutContent) {
  if (headTagRegex.test(layoutContent)) {
    return layoutContent
  }

  return layoutContent.replace(startHtmlRegex, match => `${match}\n<head></head>`)
}

function insertTitle(metadata, layoutContent) {
  if (metadata?.title) {
    const titleRegex = titleTagRegex
    const headCloseRegex = endHeadTagRegex

    if (titleRegex.test(layoutContent)) {
      layoutContent = layoutContent.replace(titleRegex, (_, attributes = '') => {
        return `<title${attributes}>${metadata.title}</title>`
      })
    } else if (headCloseRegex.test(layoutContent)) {
      layoutContent = layoutContent.replace(headCloseRegex, `<title>${metadata.title}</title></head>`)
    }
  }

  return layoutContent
}
