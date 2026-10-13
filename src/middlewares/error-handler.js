import { HttpError } from '../utils/http-error.js';

// Todas las respuestas de error tienen la misma forma: { error, details? }
// Express 5 envía aquí automáticamente los errores lanzados en funciones async.
export function errorHandler(err, req, res, next) {
    if (res.headersSent) return next(err);

    // JSON mal formado en el body
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Invalid JSON body' });
    }

    if (err instanceof HttpError) {
        const body = { error: err.message };
        if (err.details) body.details = err.details;
        return res.status(err.status).json(body);
    }

    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
}
