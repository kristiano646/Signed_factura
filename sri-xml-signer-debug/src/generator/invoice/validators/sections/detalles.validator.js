import { IVA_PERCENTAGE_CODE_ENUM, TAX_CODE_ENUM } from "../../../enums";
export function validarDetalles(comprobante) {
    const { detalles } = comprobante;
    const errors = [];
    detalles.detalle.forEach((detalle, index) => {
        // impuestos (obligatorio)
        const ivaPercentageCodes = Object.values(IVA_PERCENTAGE_CODE_ENUM);
        detalle.impuestos.impuesto.forEach((imp, j) => {
            if (imp.codigo === TAX_CODE_ENUM.VAT) {
                if (!ivaPercentageCodes.includes(imp.codigoPorcentaje.toString())) {
                    errors.push(`detalle[${index}]: impuesto[${j}]: "codigoPorcentaje" debe ser un valor válido de IVA: ${ivaPercentageCodes.join(", ")}.`);
                }
            }
        });
    });
    return errors;
}
