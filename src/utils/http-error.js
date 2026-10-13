export class HttpError extends Error {
    constructor(status, message, details) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
        this.details = details;
    }

    static badRequest(message, details) { return new HttpError(400, message, details); }
    static unauthorized(message = 'No autenticado') { return new HttpError(401, message); }
    static notFound(message = 'Resource not found') { return new HttpError(404, message); }
    static conflict(message) { return new HttpError(409, message); }
    static unavailable(message = 'Service unavailable') { return new HttpError(503, message); }
}
