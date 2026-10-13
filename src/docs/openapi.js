import { z } from 'zod';
import { toSchema } from './helpers.js';
import { healthPaths } from '../modules/health/health.docs.js';
import { authTags, authSchemas, authPaths } from '../modules/auth/auth.docs.js';
import { taskPaths } from '../modules/task/task.docs.js';

// Forma común de TODOS los errores de la API (la produce error-handler.js)
const errorSchema = z.object({
    error: z.string().meta({ example: 'Validation failed' }),
    details: z.array(
        z.object({
            field: z.string().meta({ example: 'title' }),
            message: z.string().meta({ example: 'Title is required' }),
        })
    ).optional(),
});

export const openapiDocument = {
    openapi: '3.1.0',
    info: {
        title: 'To Do List API',
        version: '1.0.0',
        description: 'API REST de tareas con Node, Express y Supabase. Las rutas con candado requieren un token JWT.',
    },
    servers: [{ url: '/api', description: 'Servidor actual' }],
    tags: [
        { name: 'Health', description: 'Estado del servidor' },
        ...authTags,
        { name: 'Tasks', description: 'CRUD de tareas (requiere token)' },
    ],
    paths: { ...healthPaths, ...authPaths, ...taskPaths },
    components: {
        securitySchemes: {
            bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        },
        schemas: {
            Error: toSchema(errorSchema),
            ...authSchemas,
        },
    },
};
