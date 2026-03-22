import { ValidationContext, ValidationStrategy } from "../interfaces";
export declare class NumberValidationStrategy implements ValidationStrategy {
    validate({ key, value, rule }: ValidationContext): string[];
}
