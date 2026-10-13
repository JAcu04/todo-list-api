import { z } from 'zod';

// Acepta un schema de zod o un JSON Schema ya escrito a mano (por ejemplo un $ref)
const isZod = (schema) => schema && typeof schema === 'object' && '_zod' in schema;

// Convierte un schema de zod en JSON Schema (el lenguaje que entiende OpenAPI 3.1)
// io: 'input' = lo que la API recibe, 'output' = lo que la API devuelve
export const toSchema = (schema, io = 'output') => {
    if (!isZod(schema)) return schema;
    const { $schema, ...jsonSchema } = z.toJSONSchema(schema, {
        target: 'draft-2020-12',
        unrepresentable: 'any',
        io,
    });
    return jsonSchema;
};

// Cuerpo de la petición en JSON
export const jsonBody = (schema) => ({
    required: true,
    content: { 'application/json': { schema: toSchema(schema, 'input') } },
});

// Respuesta exitosa en JSON
export const jsonResponse = (description, schema) => ({
    description,
    content: { 'application/json': { schema: toSchema(schema) } },
});

// Respuesta de error: todas apuntan al mismo schema común "Error"
export const errorResponse = (description) => ({
    description,
    content: {
        'application/json': { schema: { $ref: '#/components/schemas/Error' } },
    },
});

// Parámetro :id de la URL
export const idParam = {
    name: 'id',
    in: 'path',
    required: true,
    description: 'ID de la tarea',
    schema: { type: 'integer', minimum: 1, example: 1 },
};

// Marca todas las operaciones como protegidas y les agrega la respuesta 401.
// Es el requireAuth de la documentación.
export function secure(paths) {
    const result = {};
    for (const [path, item] of Object.entries(paths)) {
        result[path] = {};
        for (const [key, value] of Object.entries(item)) {
            result[path][key] =
                key === 'parameters'
                    ? value
                    : {
                          ...value,
                          security: [{ bearerAuth: [] }],
                          responses: {
                              ...value.responses,
                              401: errorResponse('Token faltante, inválido o expirado'),
                          },
                      };
        }
    }
    return result;
}
