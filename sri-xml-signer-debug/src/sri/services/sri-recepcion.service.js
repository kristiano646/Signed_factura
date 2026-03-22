import { uint8ArrayToBase64 } from "../../utils";
import { SRI_URLS } from "../const";
import { SRIRejectedError } from "../exceptions";
import { createSoapClient } from "../helpers";
export async function validateXml(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const { env, xml } = data;
    const client = await createSoapClient(SRI_URLS[env].recepcion);
    const xmlBase64 = uint8ArrayToBase64(xml);
    let result;
    try {
        [result] = await client.validarComprobanteAsync({ xml: xmlBase64 });
    }
    catch (error) {
        throw new Error(`Error SOAP al validar comprobante: ${error.message}`);
    }
    const respuesta = result === null || result === void 0 ? void 0 : result.RespuestaRecepcionComprobante;
    if (!respuesta) {
        throw new Error("Respuesta inválida del SRI (sin 'respuestaRecepcionComprobante')");
    }
    const comprobante = Array.isArray((_a = respuesta.comprobantes) === null || _a === void 0 ? void 0 : _a.comprobante)
        ? respuesta.comprobantes.comprobante[0]
        : (_b = respuesta.comprobantes) === null || _b === void 0 ? void 0 : _b.comprobante;
    const mensaje = (_c = comprobante === null || comprobante === void 0 ? void 0 : comprobante.mensajes) === null || _c === void 0 ? void 0 : _c.mensaje;
    if (respuesta.estado !== "RECIBIDA") {
        if (mensaje) {
            throw new SRIRejectedError({
                estado: respuesta.estado,
                identificador: (_d = mensaje.identificador) !== null && _d !== void 0 ? _d : "SIN_IDENTIFICADOR",
                mensaje: (_e = mensaje.mensaje) !== null && _e !== void 0 ? _e : "Mensaje no disponible",
                informacionAdicional: (_f = mensaje.informacionAdicional) !== null && _f !== void 0 ? _f : "Sin información adicional",
                tipo: (_g = mensaje.tipo) !== null && _g !== void 0 ? _g : "ERROR",
                claveAcceso: (_h = comprobante === null || comprobante === void 0 ? void 0 : comprobante.claveAcceso) !== null && _h !== void 0 ? _h : "SIN_CLAVE",
            });
        }
        throw new Error("Comprobante no recibido y sin mensaje explicativo del SRI");
    }
    return {
        estado: respuesta.estado,
        mensaje: (_j = mensaje === null || mensaje === void 0 ? void 0 : mensaje.mensaje) !== null && _j !== void 0 ? _j : "Comprobante recibido correctamente",
    };
}
