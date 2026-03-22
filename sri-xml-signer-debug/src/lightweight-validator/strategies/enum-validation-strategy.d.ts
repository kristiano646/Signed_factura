import { ValidationContext, ValidationStrategy } from "../interfaces";
export declare class EnumValidationStrategy implements ValidationStrategy {
    validate({ key, value, rule }: ValidationContext): string[];
}
