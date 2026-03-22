// strategies/NumberValidationStrategy.ts
export class NumberValidationStrategy {
    validate({ key, value, rule }) {
        const errors = [];
        if (typeof value !== "number" || isNaN(value)) {
            errors.push(`El campo "${key}" debe ser un número.`);
            return errors;
        }
        // ✔️ Validación de cantidad total de dígitos
        if (rule.maxDigits !== undefined) {
            const digits = value.toString().replace(".", "").replace("-", "").length;
            if (digits > rule.maxDigits) {
                errors.push(rule.maxDigitsMessage ||
                    `El campo "${key}" no puede tener más de ${rule.maxDigits} dígitos en total.`);
            }
        }
        // ✔️ Validación de enteros y decimales
        if (rule.digits) {
            const [intPart, decPart = ""] = Math.abs(value).toString().split(".");
            const intDigits = intPart.replace(/^0+/, "").length || 1; // sin ceros iniciales
            const decDigits = decPart.length;
            if (intDigits > rule.digits.integer || decDigits > rule.digits.fraction) {
                errors.push(rule.digitsMessage ||
                    `El campo "${key}" debe tener como máximo ${rule.digits.integer} dígitos enteros y ${rule.digits.fraction} decimales.`);
            }
        }
        return errors;
    }
}
