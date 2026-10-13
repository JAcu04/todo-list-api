import { z } from 'zod';
import { createTaskSchema, updateTaskSchema, taskSchema } from './task.schema.js';
import { jsonBody, jsonResponse, errorResponse, idParam, secure } from '../../docs/helpers.js';

export const taskPaths = secure({
    '/tasks': {
        get: {
            tags: ['Tasks'],
            summary: 'Listar tareas',
            description: 'Devuelve todas las tareas, de la más nueva a la más antigua.',
            responses: {
                200: jsonResponse('Lista de tareas', z.array(taskSchema)),
            },
        },
        post: {
            tags: ['Tasks'],
            summary: 'Crear una tarea',
            requestBody: jsonBody(createTaskSchema),
            responses: {
                201: jsonResponse('Tarea creada', taskSchema),
                400: errorResponse('Datos inválidos'),
            },
        },
    },
    '/tasks/{id}': {
        get: {
            tags: ['Tasks'],
            summary: 'Obtener una tarea por id',
            parameters: [idParam],
            responses: {
                200: jsonResponse('La tarea', taskSchema),
                400: errorResponse('Id inválido'),
                404: errorResponse('La tarea no existe'),
            },
        },
        patch: {
            tags: ['Tasks'],
            summary: 'Actualizar una tarea',
            description: 'Envía solo los campos que quieres cambiar (al menos uno).',
            parameters: [idParam],
            requestBody: jsonBody(updateTaskSchema),
            responses: {
                200: jsonResponse('Tarea actualizada', taskSchema),
                400: errorResponse('Id o datos inválidos'),
                404: errorResponse('La tarea no existe'),
            },
        },
        delete: {
            tags: ['Tasks'],
            summary: 'Eliminar una tarea',
            parameters: [idParam],
            responses: {
                204: { description: 'Tarea eliminada (sin contenido)' },
                400: errorResponse('Id inválido'),
                404: errorResponse('La tarea no existe'),
            },
        },
    },
});
