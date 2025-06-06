export class FormatRes {
  constructor (res) {
    this.res = res
  }

  // send es la base de las demás funciones de respuesta
  send (status, data, headers = { 'Content-Type': 'application/json; charset=utf-8' }) {
    this.res.writeHead(status, headers)
    return this.res.end(JSON.stringify(data))
  }

  // success envía a send como status 200 y como data = data
  success (data) {
    return this.send(200, data)
  }

  created (data) {
    return this.send(201, data)
  }

  badRequest (message = 'Solicitud incorrecta') {
    return this.send(400, { error: message })
  }

  notFound (message = 'No encontrado') {
    return this.send(404, { error: message })
  }

  serverError (message = 'Error interno del servidor') {
    return this.send(500, { error: message })
  }

  lengthRequired (message = 'Se requieren mínimo 5 caracteres') {
    return this.send(411, { error: message })
  }

  notFoundRoute () {
    return this.send(404, { error: 'Ruta no encontrada' })
  }
}
