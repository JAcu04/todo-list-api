import { HttpError } from '../utils/http-error.js';

export function notFound(req, res, next) {
    next(HttpError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}
