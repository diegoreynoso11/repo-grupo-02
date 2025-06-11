import http from 'http'
import { FormatRes } from './utils/formatRes.js'
import { getConnection } from './routesDb/config/db.js'
import { getRoutes } from './routes/get.js'
import { deleteRoutes } from './routes/delete.js'
import { postRoutes } from './routes/post.js'
import { putRoutes } from './routes/put.js'
import { patchRoutes } from './routes/patch.js'
const desiredPort = 3000

async function requestHandler (req, res) {
  const response = new FormatRes(res)
  // Validar si hay db antes de continuar
  const check = await getConnection()
  if (check?.abort) {
    return response.serverUnavailable('Base de datos caída o no conectada')
  }
  if (req.method === 'GET') {
    getRoutes(req, res)
  } else if (req.method === 'POST') {
    postRoutes(req, res)
  } else if (req.method === 'PUT') {
    putRoutes(req, res)
  } else if (req.method === 'DELETE') {
    deleteRoutes(req, res)
  } else if (req.method === 'PATCH') {
    patchRoutes(req, res)
  } else {
    return response.forbidden()
  }
}

const server = http.createServer(requestHandler)
server.listen(desiredPort, () => {
  console.log(`Servidor corriendo en http://localhost:${desiredPort}/`)
})
