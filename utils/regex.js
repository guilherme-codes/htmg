/**
 * This file contains all the regex patterns used in the project.
 */

const HTML_TAG_ATTRIBUTES = '\\s[^>]*'

const startHtmlRegex = new RegExp(`<html(${HTML_TAG_ATTRIBUTES})?>`, 'i')
const markdownHeaderRegex = new RegExp('<!--\\s*([\\s\\S]*?)\\s*-->')
const headTagRegex = new RegExp(`<head(${HTML_TAG_ATTRIBUTES})?>.*?</head>`, 'is')
const endHeadTagRegex = new RegExp('</head>', 'i')
const titleTagRegex = new RegExp(`<title(${HTML_TAG_ATTRIBUTES})?>(.*?)</title>`, 'i')
const pageContentRegex = new RegExp('<!--\\s*page_content\\s*-->', 'i') 

export {
  startHtmlRegex,
  markdownHeaderRegex,
  headTagRegex,
  titleTagRegex,
  endHeadTagRegex,
  pageContentRegex
}