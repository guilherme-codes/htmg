import assert from 'node:assert/strict'
import test from 'node:test'
import { minifyHtml, minifyCSS, minifyJS } from '../../utils/minify.js'

// Teste para minifyHtml
test('minifyHtml should minify HTML content', () => {
  const html = '<div>  <p>Hello</p>  </div>'
  const expectedHtml = '<div><p>Hello</p></div>'
  assert.strictEqual(minifyHtml(html), expectedHtml)
})

// Teste para minifyCSS
test('minifyCSS should minify CSS content', async () => {
  const css = 'h1 { color: red; } /* comment */'
  const expectedCss = 'h1{color:red}'
  const result = await minifyCSS(css)
  assert.strictEqual(result, expectedCss)
})

// Teste para minifyJS
test('minifyJS should minify JavaScript content', async () => {
  const js = 'function test() { console.log("Hello"); }'
  const expectedJs = 'function test(){console.log("Hello")}'
  const result = await minifyJS(js)
  assert.strictEqual(result, expectedJs)
})
