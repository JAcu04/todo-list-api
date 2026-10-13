import { HttpError } from '../utils/http-error.js';

// source: 'body' | 'params' | 'query'
export const validateSchema = (schema, source = 'body') => (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
        const details = result.error.issues.map((issue) => ({
            field: issue.path.join('.') || source,
            message: issue.message,
        }));
        return next(HttpError.badRequest('Validation failed', details));
    }

    // Reemplaza por el dato ya limpio (trim, coerce, sin campos desconocidos)
    req[source] = result.data;
    next();
};
