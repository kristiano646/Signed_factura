import { validarDetalles, validateInfoFactura, validarRetenciones, } from "./sections";
export function validateFactura(data) {
    const errors = [];
    errors.push(...validarDetalles(data));
    errors.push(...validateInfoFactura(data));
    errors.push(...validarRetenciones(data));
    return errors;
}
