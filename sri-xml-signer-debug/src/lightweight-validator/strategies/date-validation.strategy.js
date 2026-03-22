// strategies/DateValidationStrategy.ts
export class DateValidationStrategy {
    validate({ key, value, rule }) {
        const errors = [];
        let parsed;
        if (value instanceof Date) {
            parsed = value;
        }
        else if (typeof value === "string") {
            parsed = new Date(value); // intenta parsear string ISO
        }
        else {
            errors.push(rule.message ||
                `El campo "${key}" debe ser una fecha válida en formato ISO 8601 (por ejemplo: "2025-06-22T14:30:00Z").`);
            return errors;
        }
        if (isNaN(parsed.getTime())) {
            errors.push(rule.message ||
                `El campo "${key}" debe ser una fecha válida en formato ISO 8601.`);
        }
        return errors;
    }
}
