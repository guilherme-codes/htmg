import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = 3006

const server = http.createServer((req, res) => {
  const url = req.url || ''
  let urlPath = decodeURIComponent(url.split('?')[0])
    
  if (urlPath === '/') {
    urlPath = '/index.html'
  } 

  const filePath = path.join(__dirname, '..', 'output', urlPath)

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404)
      res.end()
      return
    }

    const ext = path.extname(filePath)
    const contentTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.pdf': 'application/pdf',
      '.txt': 'text/plain'
    }

    const contentType = contentTypes[ext] || 'application/octet-stream'

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500)
        res.end('Erro on read file: ' + err.message)
        return
      }

      res.writeHead(200, { 'Content-Type': contentType })
      res.end(data)
    })
  })
})

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})