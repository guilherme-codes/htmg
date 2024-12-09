import assert from 'node:assert'
import test from 'node:test'
import { readLayouts } from '../core/reader.js'
import { getExecBasePath } from '../utils/path.js'
import { layoutsDir } from '../utils/contants.js'

test('readLayouts returns the expected object', async () => {
  const basePath = getExecBasePath(layoutsDir)
  const result = await readLayouts(basePath)

  assert.ok(result.default)
})

