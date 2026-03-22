import { ValidationContext, ValidationStrategy } from "../interfaces";
export declare class DateValidationStrategy implements ValidationStrategy {
    validate({ key, value, rule }: ValidationContext): string[];
}
