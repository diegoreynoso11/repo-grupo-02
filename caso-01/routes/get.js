import { FormatRes } from '../utils/formatRes.js'
import pool from '../config/db.js'

export async function getRoutes (req, res) {
  const response = new FormatRes(res)

  // Ruta raíz: muestra info de la API
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

  try {
    // GET ALL
    if (req.url === '/get/all') {
      const [rows] = await pool.query('SELECT * FROM products')
      return response.success(rows)
    }

    // GET BY ID
    const idMatch = req.url.match(/^\/get\/id\/(\d+)$/)
    if (idMatch) {
      const id = idMatch[1]
      const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id])

      if (rows.length === 0){
        return response.notFound('Producto no encontrado')
      }

      return response.success(rows[0])
    }

    // Si no matchea ninguna ruta devolvemos 404
    return response.notFoundRoute()

  } catch (error) {
    console.error('Error en GET:', error)
    return response.serverError()
  }
}