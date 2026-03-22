// validation/strategies/BooleanValidationStrategy.ts
export class BooleanValidationStrategy {
    validate({ key, value }) {
        const errors = [];
        if (typeof value !== "boolean") {
            errors.push(`El campo "${key}" debe ser un boolean.`);
        }
        return errors;
    }
}
