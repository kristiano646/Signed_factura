import { SRI_URLS } from "../const";
import { createSoapClient, extractAutorizacionXml, normalizeSriMessages, } from "../helpers";
import { SRIAutorizacionError, SRIUnauthorizedError, } from "../exceptions/sri-autorizacion.error";
export async function authorizeXml(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const { claveAcceso, env } = data;
    const client = await createSoapClient(SRI_URLS[env].autorizacion);
    const [result, rawResponse] = await client.autorizacionComprobanteAsync({
        claveAccesoComprobante: claveAcceso,
    });
    const autorizacionXml = extractAutorizacionXml(rawResponse);
    const respuesta = result === null || result === void 0 ? void 0 : result.RespuestaAutorizacionComprobante;
    const autorizacion = (_a = respuesta === null || respuesta === void 0 ? void 0 : respuesta.autorizaciones) === null || _a === void 0 ? void 0 : _a.autorizacion;
    if (!autorizacion || autorizacion.length === 0) {
        throw new Error("No se recibió información de autorización del SRI");
    }
    const estado = autorizacion.estado;
    if (estado === "AUTORIZADO") {
        return {
            claveAcceso: autorizacion.claveAcceso,
            estadoAutorizacion: estado,
            comprobante: autorizacion.comprobante,
            comprobanteCrudo: autorizacionXml,
            rucEmisor: (_b = autorizacion.numeroAutorizacion) !== null && _b !== void 0 ? _b : "",
            fechaAutorizacion: autorizacion.fechaAutorizacion,
            ambiente: autorizacion.ambiente,
            mensajes: normalizeSriMessages((_c = autorizacion.mensajes) === null || _c === void 0 ? void 0 : _c.mensaje),
        };
    }
    if (estado === "NO AUTORIZADO" || estado === "RECHAZADA") {
        const mensaje = (_d = autorizacion.mensajes) === null || _d === void 0 ? void 0 : _d.mensaje;
        const mensajeFinal = Array.isArray(mensaje) ? mensaje[0] : mensaje;
        if (mensajeFinal) {
            throw new SRIAutorizacionError({
                estado,
                identificador: (_e = mensajeFinal.identificador) !== null && _e !== void 0 ? _e : "SIN_IDENTIFICADOR",
                mensaje: (_f = mensajeFinal.mensaje) !== null && _f !== void 0 ? _f : "Mensaje no disponible",
                informacionAdicional: (_g = mensajeFinal.informacionAdicional) !== null && _g !== void 0 ? _g : "Sin información adicional",
                tipo: (_h = mensajeFinal.tipo) !== null && _h !== void 0 ? _h : "ERROR",
                claveAcceso: (_j = respuesta.claveAccesoConsultada) !== null && _j !== void 0 ? _j : claveAcceso,
                ambiente: autorizacion.ambiente,
                comprobanteXml: autorizacion.comprobante,
            });
        }
        throw new SRIUnauthorizedError(estado);
    }
    throw new SRIUnauthorizedError(estado);
}
