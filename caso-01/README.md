# Caso 01 - Proyecto API - NODEjs

Este repositorio contiene la estructura y archivos necesarios para el desarrollo del **Caso 01** del grupo 02.

## Estructura del Proyecto

```
repo-grupo-02/
└── caso-01/
    ├── README.md
    ├── server-db.js
    ├── routes/
    |   ├── delete.js
    |   ├── get.js
    |   ├── post.js
    |   └── put.js
    ├── config/
    |   ├── init.sql
    |   └── db.js
    └── utils/
        └── formatRes.js
```

## Descripción

El proyecto consiste en la creación de una API, utilizando JavaScript y NODEjs puro.

## Requisitos

- XAMPP (u otro entorno de desarrollo preferido)
- MySQL workbench

## Iniciar  

Inicia el proyecto con `pnpm run dev`

## 🧰 Utilidad de `FormatRes`

La clase `FormatRes` te permite manejar respuestas HTTP de forma estructurada y legible, evitando la repetición de lógica para estados comunes como `200 OK`, `404 Not Found`, etc. y asi respetar el principio *DRY* (Don't Repeat Yourself) 

### 📄 Importación

Primero, importa la clase en tu archivo:

```js
import { FormatRes } from '../utils/formatRes.js' // Ajusta la ruta pero por defecto esa funcionará
```

### 🚀 Uso básico

```js
const server = http.createServer((req, res) => {
  const response = new FormatRes(res)

  if (req.url === '/api/data') {
    const data = { message: 'Hola mundo' }
    return response.success(data)
  }

  if (req.url === '/api/create') {
    const newItem = { id: 1, name: 'Item creado' }
    return response.created(newItem)
  }

  // Para ruta no encontrada
  return response.notFoundRoute()
})

server.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000')
})
```

### 📚 Métodos disponibles (hasta el momento)

| Método                | Código HTTP | Descripción                                          |
| --------------------- | ----------- | ---------------------------------------------------- |
| `success(data)`       | `200`       | Respuesta exitosa con contenido                      |
| `created(data)`       | `201`       | Recurso creado correctamente                         |
| `accepted(msg)`       | `202`       | petición aceptada                                    |
| `noContent()`         | `204`       | Cuerpo de la solicitud vacío                         |
| `badRequest(msg)`     | `400`       | Error por solicitud incorrecta                       |
| `forbidden(msg)`      | `403`       | Método no permitido                                  |
| `notFound(msg)`       | `404`       | Recurso no encontrado                                |
| `notFoundRoute()`     | `404`       | Ruta no existente                                    |
| `notAcceptable()`     | `406`       | Datos incorrectos                                    |
| `conflict()`          | `409`       | No se modificó el elemento                           |
| `lengthRequired(msg)` | `411`       | Longitud requerida (ej. para validaciones de campos) |
| `urlTooLong()`        | `414`       | El id es demasiado largo                             |
| `serverError(msg)`    | `500`       | Error interno del servidor                           |
| `notImplemented()`    | `501`       | Funcionalidad no implementada                        |
| `serverUnavailable()` | `503`       | Servidor caído                                       |

### 🧪 Ejemplo personalizado

```js
// Si faltan datos en una solicitud POST
if (!body.name || body.name.length < 5) {
  return response.lengthRequired('El campo "name" debe tener al menos 5 caracteres')
}
```
