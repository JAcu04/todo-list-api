import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { apiRouter } from './routes.js';
import { notFound } from './middlewares/not-found.js';
import { errorHandler } from './middlewares/error-handler.js';

export function createApp() {
    const app = express();

    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());

    app.use('/api', apiRouter);

    // Siempre al final: primero 404, luego el manejador de errores
    app.use(notFound);
    app.use(errorHandler);

    return app;
}
