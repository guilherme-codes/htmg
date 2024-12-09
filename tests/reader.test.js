import assert from 'node:assert'
import test from 'node:test'
import { readLayouts } from '../core/reader.js'
import { getExecBasePath } from '../utils/path.js'
import env from '../utils/environment.js'
import path from 'node:path'

test('readLayouts returns the expected object', async () => {
  const basePath = getExecBasePath(
    path.join('template', env.layoutsDir)
  )
  const result = await readLayouts(basePath)

  assert.ok(result.default)
})

