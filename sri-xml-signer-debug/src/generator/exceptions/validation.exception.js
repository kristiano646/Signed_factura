export class ValidationException extends Error {
    constructor(errors) {
        super("Error de validación");
        this.errors = errors;
    }
}
