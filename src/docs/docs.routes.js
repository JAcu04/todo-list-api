import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { openapiDocument } from './openapi.js';

export const docsRouter = Router();

// JSON crudo (importable en Postman o para generar clientes)
docsRouter.get('/openapi.json', (req, res) => res.json(openapiDocument));

// Swagger UI. persistAuthorization: el token sobrevive al refrescar la página.
docsRouter.use(
    '/',
    swaggerUi.serve,
    swaggerUi.setup(openapiDocument, {
        swaggerOptions: { persistAuthorization: true },
    })
);
