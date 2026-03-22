export declare class ValidationException extends Error {
    readonly errors: string[];
    constructor(errors: string[]);
}
