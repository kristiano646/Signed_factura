import { ENV_ENUM, TAX_CODE_ENUM, CONTRIBUYENTE_RIMPE_ENUM, OBLIGADO_CONTABILIDAD_ENUM, PAYMENT_METHOD_CODE_ENUM, IDENTIFICATION_CODE_ENUM, CODIGO_RETENCION_ENUM, IMPUESTO_A_RETENER_ENUM } from "../../enums";
export declare class InfoTributariaModel {
    ambiente: ENV_ENUM;
    razonSocial: string;
    nombreComercial?: string;
    ruc: string;
    estab: string;
    ptoEmi: string;
    secuencial: string;
    dirMatriz: string;
    agenteRetencion?: string;
    contribuyenteRimpe?: CONTRIBUYENTE_RIMPE_ENUM;
}
export declare class TotalImpuestoModel {
    codigo: TAX_CODE_ENUM;
    codigoPorcentaje: number;
    baseImponible: number;
    valor: number;
    descuentoAdicional?: number;
}
export declare class TotalConImpuestosModel {
    totalImpuesto: TotalImpuestoModel[];
}
export declare class PagoModel {
    formaPago: PAYMENT_METHOD_CODE_ENUM;
    total: number;
    plazo?: number;
    unidadTiempo?: string;
}
export declare class PagosModel {
    pago: PagoModel[];
}
export declare class InfoFacturaModel {
    fechaEmision: Date;
    dirEstablecimiento: string;
    contribuyenteEspecial?: string;
    obligadoContabilidad?: OBLIGADO_CONTABILIDAD_ENUM;
    tipoIdentificacionComprador: IDENTIFICATION_CODE_ENUM;
    guiaRemision?: string;
    razonSocialComprador: string;
    identificacionComprador: string;
    direccionComprador?: string;
    totalSinImpuestos: number;
    totalDescuento: number;
    totalConImpuestos: TotalConImpuestosModel;
    propina: number;
    importeTotal: number;
    moneda?: string;
    pagos: PagosModel;
    valorRetIva?: number;
    valorRetRenta?: number;
}
export declare class DetAdicionalModel {
    nombre: string;
    valor: string;
}
export declare class ImpuestoDetalleModel {
    codigo: TAX_CODE_ENUM;
    codigoPorcentaje: number;
    tarifa: number;
    baseImponible: number;
    valor: number;
}
export declare class DetallesAdicionalesModel {
    detAdicional: DetAdicionalModel[];
}
export declare class ImpuestosModel {
    impuesto: ImpuestoDetalleModel[];
}
export declare class DetalleModel {
    codigoPrincipal: string;
    codigoAuxiliar?: string;
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    descuento: number;
    precioTotalSinImpuesto: number;
    detallesAdicionales?: DetallesAdicionalesModel;
    impuestos: ImpuestosModel;
}
export declare class CampoAdicionalModel {
    nombre: string;
    value: string;
}
export declare class InfoAdicionalModel {
    campoAdicional: CampoAdicionalModel[];
}
export declare class DetallesModel {
    detalle: DetalleModel[];
}
export declare class RetencionesModel {
    retencion: RetencionModel[];
}
export declare class RetencionModel {
    codigo: IMPUESTO_A_RETENER_ENUM;
    codigoPorcentaje: CODIGO_RETENCION_ENUM;
    tarifa: number;
    valor: number;
}
export declare class ComprobanteModel {
    infoTributaria: InfoTributariaModel;
    infoFactura: InfoFacturaModel;
    detalles: DetallesModel;
    retenciones?: RetencionesModel;
    infoAdicional?: InfoAdicionalModel;
}
