import { TarifaRetencionXml } from "../../../const/tarifa-retencion-xml.const";
export function validarRetenciones(comprobante) {
    const { retenciones } = comprobante;
    const errors = [];
    if (retenciones) {
        retenciones.retencion.forEach((retencion, index) => {
            const prefix = `retencion[${index}]`;
            const tarifaRetencion = TarifaRetencionXml[retencion.codigoPorcentaje];
            if (tarifaRetencion !== retencion.tarifa) {
                errors.push(`El campo "${prefix}.tarifa" no es valido para el codigo de porcentaje ${prefix}`);
            }
        });
    }
    return errors;
}
