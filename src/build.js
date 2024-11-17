import { compileLayouts } from './layout-compiler.js'
import { processMarkdownFiles } from './markdown-compiler.js'

(async function build() {
  const compiledLayouts = await compileLayouts()
  await processMarkdownFiles(compiledLayouts)
})()
