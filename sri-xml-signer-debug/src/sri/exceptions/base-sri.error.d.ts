export declare abstract class BaseSRIError extends Error {
    readonly estado: string;
    readonly identificador: string;
    readonly mensajeSRI: string;
    readonly informacionAdicional: string;
    readonly tipo: string;
    readonly claveAcceso: string;
    constructor(params: {
        estado: string;
        identificador: string;
        mensaje: string;
        informacionAdicional: string;
        tipo: string;
        claveAcceso: string;
        customMessage?: string;
    });
}
export declare class SRIError extends Error {
    constructor(message: string);
}
