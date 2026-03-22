export declare class InfrastructureError extends Error {
    constructor(message: string);
}
export declare class UnknownSignStrategyError extends InfrastructureError {
    constructor(friendlyName: string);
}
export declare class SignStrategyError extends InfrastructureError {
    constructor(message: string);
}
export declare class SigningKeyNotFoundError extends SignStrategyError {
    constructor(friendlyName: string);
}
export declare class PrivateKeyExtractionError extends SignStrategyError {
    constructor(sourceLabel?: string);
}
export declare class UanatacaCertificateNotFoundError extends SignStrategyError {
    constructor();
}
export declare class EntidadCertificacionNotFoundError extends SignStrategyError {
    constructor();
}
export declare class InvalidP12StructureError extends Error {
    constructor();
}
export declare class InvalidP12PasswordError extends Error {
    constructor();
}
export declare class InvalidXmlStructureError extends Error {
    constructor(message?: string);
}
