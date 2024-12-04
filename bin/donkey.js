#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const [,, command] = process.argv

if (command === 'dev') {
  import(path.join(__dirname, '..', 'dev.js'))
    .catch(error => {
      console.error(`Error: ${error}`)
    })
} else if (command === 'build') {
  import(path.join(__dirname, '..', 'build.js'))
    .catch(error => {
      console.error(`Error: ${error}`)
    })
} else {
  console.log('Unknown command')
}