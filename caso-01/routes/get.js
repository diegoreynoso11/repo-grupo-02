import { FormatRes } from '../utils/formatRes.js'

export async function getRoutes (req, res) {
  const response = new FormatRes(res)
  if (req.url === '/') {
    return response.success({
      message: 'Api simple estructura - http + mySQL',
      routes: {
        '/get/all': 'Traer todos los items',
        '/get/id/:id': 'Traer un elemento por su ID',
        '/get/name/:name': 'Traer un elemento por su nombre',
        '/product/add/': 'Crear un nuevo elemento',
        '/product/update/:id': 'Editar un elemento existente',
        '/product/delete/:id': 'Eliminar un elemento existente'
      }
    })
  }
}
