import { ENV_ENUM } from "../../enums";
export declare function p_obtener_codigo_autorizacion(fechaEmision: Date, tipoComprobante: string, ruc: string, ambiente: ENV_ENUM, estab: number, ptoEmi: number, secuencial: string, codigo?: string, tipoEmision?: number): string;
export declare function pad(n: number | string, width: number, z?: string): string;
export declare function p_calcular_digito_modulo11(numero: string): number;
