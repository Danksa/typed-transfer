export class DeserializationError extends Error {
    constructor(serdes: Object, message: string) {
        super(`[${serdes.constructor.name}] ${message}`);
    }
}