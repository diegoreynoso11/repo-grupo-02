export class FormatRes {
  constructor(res) {
    this.res = res
  }

  // creo el send que es la base de las demás funciones de respuesta
  send(status, data, headers = { 'Content-Type': 'application/json; charset=utf-8' }) {
    this.res.writeHead(status, headers)
    return this.res.end(JSON.stringify(data))
  }

  // success envía a send como status 200 y como data = data
  success(data) {
    return this.send(200, data)
  }

  created(data) {
    return this.send(201, data)
  }

  accepted(data) {
    return this.send(202, data)
  }

  noContent(message = 'Cuerpo de la solicitud vacío') {
    return this.send(204, { error: message })
  }

  badRequest(message = 'Solicitud incorrecta') {
    return this.send(400, { error: message })
  }

  unauthorized(message = "Acceso no autorizado") {
    return this.send(401, { error: message });
  }

  forbidden(message = "Acceso prohibido") {
    return this.send(403, { error: message });
  }

  notFound(message = 'No encontrado') {
    return this.send(404, { error: message })
  }

  notFoundRoute() {
    return this.send(404, { error: 'Ruta no encontrada' })
  }

  notAcceptable(message = 'Datos incorrectos') {
    return this.send(406, { error: message })
  }

  conflict(message = 'No se modificó el elemento') {
    return this.send(409, { error: message })
  }

  lengthRequired(message = 'Se requieren mínimo 5 caracteres') {
    return this.send(411, { error: message })
  }

  urlTooLong(message = 'La url es demasiado larga') {
    return this.send(414, { error: message })
  }

  unsupportedMediaType(message = 'No es un JSON valido') {
    return this.send(415, { error: message })
  }

  serverError(message = 'Error interno del servidor') {
    return this.send(500, { error: message })
  }

  notImplemented(message = 'Funcionalidad no implementada') {
    return this.send(501, { error: message })
  }

  serverUnavailable(message = 'Servidor caído') {
    return this.send(503, { error: message })
  }
}
