export class SerializationError extends Error {
    constructor(serdes: Object, message: string) {
        super(`[${serdes.constructor.name}] ${message}`);
    }
}