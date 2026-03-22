import { ValidationContext, ValidationStrategy } from "../interfaces";
export declare class BooleanValidationStrategy implements ValidationStrategy {
    validate({ key, value }: ValidationContext): string[];
}
