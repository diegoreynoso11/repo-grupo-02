export function getBody(req) {
    
    // Objeto error para el reject
    const err = {
        title: 'Unsupported Media Type',
        statusCode: 415
    }

    return new Promise((resolve, reject) => {
        
        // Verificamos que el Content-Type sea application/json
        const contentType = req.headers['Content-Type'];
        if (!contentType || !contentType.includes('application/json')) {
            return reject(err);
        }

        let body = '';

        // Se acumulan los datos del body
        req.on('data', chunk => {
            body += chunk;
        });

        // Cuando termina de recibir datos, intenta parsear
        req.on('end', () => {
            try {
                const parsed = JSON.parse(body);
                resolve(parsed);
            } catch (error) {
                reject(err);
            }
        });

        // Manejo de errores de la request
        req.on('error', err => {
            reject(err);
        });
    });
}