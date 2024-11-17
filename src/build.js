import { builLayouts } from './core/layout-builder.js'
import { buildMarkdownFiles } from './core/markdown-builder.js'

(async function build() {
  const layoutsContent = await builLayouts()
  
  await buildMarkdownFiles(layoutsContent)
})()
