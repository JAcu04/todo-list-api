import { z } from 'zod';

// "5" (texto de la URL) -> 5 (número)
export const idParamSchema = z.object({
    id: z.coerce.number().int().positive('id must be a positive integer'),
});

export const createTaskSchema = z.object({
    title: z.string().trim().min(1, 'Title is required').max(200)
        .meta({ example: 'Preparar la demo' }),
    description: z.string().trim().max(1000).optional()
        .meta({ example: 'Revisar los pasos 1 al 6' }),
    done: z.boolean().optional()
        .meta({ example: false }),
});

// En PATCH todos los campos son opcionales, pero debe venir al menos uno
export const updateTaskSchema = createTaskSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field is required',
    });

// Describe la RESPUESTA (lo que devuelve la API). Solo se usa para documentar.
export const taskSchema = z.object({
    id: z.number().int().meta({ example: 1 }),
    title: z.string().meta({ example: 'Preparar la demo' }),
    description: z.string().nullable().meta({ example: 'Revisar los pasos 1 al 6' }),
    done: z.boolean().meta({ example: false }),
    created_at: z.iso.datetime().meta({ example: '2026-10-09T18:30:00.000Z' }),
});
