import { SRIError } from "./base-sri.error";
export class SRIAutorizacionError extends Error {
    constructor(params) {
        const msg = `[SRI-${params.tipo}] ${params.mensaje} (ID ${params.identificador}) - ${params.informacionAdicional}`;
        super(msg);
        this.estado = params.estado;
        this.identificador = params.identificador;
        this.mensajeSRI = params.mensaje;
        this.informacionAdicional = params.informacionAdicional;
        this.tipo = params.tipo;
        this.claveAcceso = params.claveAcceso;
        this.ambiente = params.ambiente;
        this.comprobanteXml = params.comprobanteXml;
    }
}
export class SRIUnauthorizedError extends SRIError {
    constructor(estado) {
        super(`Estado del comprobante: ${estado}`);
        this.estado = estado;
        this.name = "SRIUnauthorizedError";
    }
}
