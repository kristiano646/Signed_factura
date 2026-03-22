import { ENV_ENUM } from "../../enums";
import { documentTypeCodes } from "../../const";
import { formatDDMM, formatDDMMYYYY } from "../../../utils";
export function p_obtener_codigo_autorizacion(fechaEmision = new Date(), tipoComprobante = "factura", ruc = "9999999999999", ambiente = ENV_ENUM.TEST, estab = 1, ptoEmi = 1, secuencial, codigo, tipoEmision = 1) {
    var _a;
    const formattedDate = formatDDMMYYYY(fechaEmision);
    const tipoDoc = (_a = documentTypeCodes[tipoComprobante]) !== null && _a !== void 0 ? _a : "01";
    if (!secuencial)
        throw new Error("El secuencial es obligatorio");
    codigo =
        codigo !== null && codigo !== void 0 ? codigo : formatDDMM(fechaEmision) +
            pad(secuencial, 4).slice(-3) +
            p_calcular_digito_modulo11(formatDDMM(fechaEmision) + pad(secuencial, 3).slice(-3));
    const codigo_autorizacion = formattedDate +
        pad(tipoDoc, 2) +
        pad(ruc, 13) +
        pad(ambiente, 1) +
        pad(estab, 3) +
        pad(ptoEmi, 3) +
        pad(secuencial, 9) +
        pad(codigo, 8) +
        pad(tipoEmision, 1);
    const digito_calculado = p_calcular_digito_modulo11(codigo_autorizacion);
    return digito_calculado > -1 ? codigo_autorizacion + digito_calculado : "";
}
export function pad(n, width, z = "0") {
    return n.toString().padStart(width, z);
}
export function p_calcular_digito_modulo11(numero) {
    if (!/^\d+$/.test(numero))
        return -1;
    const digitos = numero.split("").map(Number);
    let suma = digitos.reduce((total, valor, i) => total + valor * (7 - (i % 6)), 0);
    let digito = 11 - (suma % 11);
    return digito === 11 ? 0 : digito === 10 ? 1 : digito;
}
