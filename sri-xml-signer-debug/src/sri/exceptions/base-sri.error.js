export class BaseSRIError extends Error {
    constructor(params) {
        var _a;
        const fullMessage = (_a = params.customMessage) !== null && _a !== void 0 ? _a : `[SRI-${params.tipo}] ${params.mensaje} (ID ${params.identificador}) - ${params.informacionAdicional}`;
        super(fullMessage);
        this.estado = params.estado;
        this.identificador = params.identificador;
        this.mensajeSRI = params.mensaje;
        this.informacionAdicional = params.informacionAdicional;
        this.tipo = params.tipo;
        this.claveAcceso = params.claveAcceso;
    }
}
export class SRIError extends Error {
    constructor(message) {
        super(message);
        this.name = "SRIError";
    }
}
