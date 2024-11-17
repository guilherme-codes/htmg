import { compileLayouts } from './core/layout-compiler.js'
import { compileMarkdownFiles } from './core/markdown-compiler.js'

(async function build() {
  const compiledLayouts = await compileLayouts()
  await compileMarkdownFiles(compiledLayouts)
})()
