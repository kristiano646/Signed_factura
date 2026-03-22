import { SRIError } from "./base-sri.error";
export declare class SRIAutorizacionError extends Error {
    readonly estado: string;
    readonly identificador: string;
    readonly mensajeSRI: string;
    readonly informacionAdicional: string;
    readonly tipo: string;
    readonly claveAcceso: string;
    readonly ambiente?: string;
    readonly comprobanteXml?: string;
    constructor(params: {
        estado: string;
        identificador: string;
        mensaje: string;
        informacionAdicional: string;
        tipo: string;
        claveAcceso: string;
        ambiente?: string;
        comprobanteXml?: string;
    });
}
export declare class SRIUnauthorizedError extends SRIError {
    readonly estado: string;
    constructor(estado: string);
}
