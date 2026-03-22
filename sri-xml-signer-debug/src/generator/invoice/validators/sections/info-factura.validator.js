import { IVA_PERCENTAGE_LABELS } from "../../../const";
import { IDENTIFICATION_CODE_ENUM, IVA_PERCENTAGE_CODE_ENUM, TAX_CODE_ENUM, } from "../../../enums";
export function validateInfoFactura(comprobante) {
    const { infoFactura } = comprobante;
    const errors = [];
    if (infoFactura.tipoIdentificacionComprador ===
        IDENTIFICATION_CODE_ENUM.CEDULA &&
        infoFactura.identificacionComprador.length !== 10) {
        errors.push(`EL tipo de idenificacion no corresponde con una Cedula`);
    }
    else if (infoFactura.tipoIdentificacionComprador === IDENTIFICATION_CODE_ENUM.RUC &&
        infoFactura.identificacionComprador.length !== 13) {
        errors.push(`EL tipo de idenificacion no corresponde con un Ruc`);
    }
    const ivaPercentageCodes = Object.values(IVA_PERCENTAGE_CODE_ENUM);
    infoFactura.totalConImpuestos.totalImpuesto.forEach((item, index) => {
        const prefix = `totalImpuesto[${index}]`;
        if (item.codigo === TAX_CODE_ENUM.VAT) {
            if (!ivaPercentageCodes.includes(item.codigoPorcentaje.toString())) {
                const validLabels = ivaPercentageCodes
                    .map((code) => IVA_PERCENTAGE_LABELS[code])
                    .join(", ");
                errors.push(`detalle[${index}]: impuesto[${index}]: "codigoPorcentaje" debe ser un valor válido de IVA: ${validLabels}.`);
            }
        }
        // descuentoAdicional: opcional, solo aplica para código impuesto 2
        if (item.codigo !== TAX_CODE_ENUM.VAT &&
            item.descuentoAdicional !== undefined) {
            errors.push(`El campo "${prefix}.descuentoAdicional" solo es valido para el codigo 2 (iva)`);
        }
    });
    return errors;
}
