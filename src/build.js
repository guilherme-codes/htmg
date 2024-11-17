import { compileLayouts } from './core/layout-compiler.js'
import { processMarkdownFiles } from './core/markdown-compiler.js'

(async function build() {
  const compiledLayouts = await compileLayouts()
  await processMarkdownFiles(compiledLayouts)
})()
