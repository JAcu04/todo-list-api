import { z } from 'zod';
import { jsonResponse } from '../../docs/helpers.js';

const healthSchema = z.object({
    status: z.string().meta({ example: 'ok' }),
});

export const healthPaths = {
    '/health': {
        get: {
            tags: ['Health'],
            summary: 'Verifica que el servidor está vivo',
            responses: {
                200: jsonResponse('Servidor funcionando', healthSchema),
            },
        },
    },
};
