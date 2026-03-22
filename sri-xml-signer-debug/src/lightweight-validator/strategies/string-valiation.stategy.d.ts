import { ValidationContext, ValidationStrategy } from "../interfaces";
export declare class StringValidationStrategy implements ValidationStrategy {
    validate({ key, value, rule }: ValidationContext): string[];
}
