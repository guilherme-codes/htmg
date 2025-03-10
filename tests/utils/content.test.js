import assert from 'node:assert/strict'
import test from 'node:test'
import { markdownToHtml, extractMetadata, injectMarkdownMetadata } from '../../utils/content.js'

// Teste para markdownToHtml
test('markdownToHtml should convert markdown to HTML', () => {
  const markdown = '# Title'
  const expectedHtml = '<h1 id="title">Title</h1>'
  assert.strictEqual(markdownToHtml(markdown), expectedHtml)
})

// Teste para extractMetadata
test('extractMetadata should return metadata from markdown', () => {
  const markdown = `<!--
  title: Test Page
  author: John Doe
  -->
  `
  const expectedMetadata = { title: 'Test Page', author: 'John Doe' }
  assert.deepStrictEqual(extractMetadata(markdown), expectedMetadata)
})

test('extractMetadata should return null if no metadata is found', () => {
  const markdown = '# No Metadata'
  assert.strictEqual(extractMetadata(markdown), null)
})

// Teste para injectMarkdownMetadata
test('injectMarkdownMetadata should inject metadata into layout', () => {
  const layout = '<html><body></body></html>'
  const metadata = { title: 'Test Page' }
  const result = injectMarkdownMetadata(layout, metadata)
  assert.match(result, /<title>Test Page<\/title>/)
})
