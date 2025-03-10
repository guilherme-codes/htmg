import assert from 'node:assert'
import test from 'node:test'
import { readLayouts } from '../core/reader.js'
import { getExecBasePath } from '../utils/path.js'
import env from '../utils/environment.js'
import path from 'node:path'
import { parseFileContent } from '../core/parser.js'

test('Parse layout file content', async () => {
  const basePath = getExecBasePath(
    path.join('template', env.layoutsDir)
  )
  const result = await readLayouts(basePath)
  const compiledContent = parseFileContent(result.default.index, result.default)

  assert.ok(compiledContent.includes('<head>'), 'Missing <head> tag')
  assert.ok(compiledContent.includes('<body>'), 'Missing <body> tag')
  assert.ok(compiledContent.includes('<!-- page_content -->'), 'Missing <!-- page_content --> comment')
})



