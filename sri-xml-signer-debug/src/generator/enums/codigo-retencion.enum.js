/**
 * Códigos de retención (IVA & Renta) según tablas oficiales
 */
export var CODIGO_RETENCION_ENUM;
(function (CODIGO_RETENCION_ENUM) {
    // ——— Retención IVA ———
    /**
     * 100% (aplica para retenciones de IVA de conformidad con Resolución No. NAC-DGERCGC21-00000063)
     * Tarifa en el XML: 1
     */
    CODIGO_RETENCION_ENUM[CODIGO_RETENCION_ENUM["IVA_CIENTO_POR_CIENTO_RESOLUCION"] = 3] = "IVA_CIENTO_POR_CIENTO_RESOLUCION";
    /**
     * 12% (Retención de IVA presuntivo por Editores a Margen de Comercialización/Vocedores)
     * Tarifa en el XML: 0.12
     */
    CODIGO_RETENCION_ENUM[CODIGO_RETENCION_ENUM["IVA_DOCE_POR_CIENTO_PRESUNTIVO_EDITORES"] = 4] = "IVA_DOCE_POR_CIENTO_PRESUNTIVO_EDITORES";
    /**
     * 100% (Retención de IVA venta periódicos y/o revistas a Distribuidores)
     * Tarifa en el XML: 100
     */
    CODIGO_RETENCION_ENUM[CODIGO_RETENCION_ENUM["IVA_CIENTO_POR_CIENTO_DISTRIBUIDORES"] = 5] = "IVA_CIENTO_POR_CIENTO_DISTRIBUIDORES";
    /**
     * 100% (Retención de IVA venta de periódicos y/o revistas a voceadores)
     * Tarifa en el XML: 100
     */
    CODIGO_RETENCION_ENUM[CODIGO_RETENCION_ENUM["IVA_CIENTO_POR_CIENTO_VOCEADORES"] = 6] = "IVA_CIENTO_POR_CIENTO_VOCEADORES";
    // ——— Retención Renta ———
    /**
     * 0.002 (2 por mil)
     * Tarifa en el XML: 0.20
     */
    CODIGO_RETENCION_ENUM[CODIGO_RETENCION_ENUM["RENTA_DOS_POR_MIL"] = 327] = "RENTA_DOS_POR_MIL";
    /**
     * 0.003 (3 por mil)
     * Tarifa en el XML: 0.20
     */
    CODIGO_RETENCION_ENUM[CODIGO_RETENCION_ENUM["RENTA_TRES_POR_MIL"] = 328] = "RENTA_TRES_POR_MIL";
})(CODIGO_RETENCION_ENUM || (CODIGO_RETENCION_ENUM = {}));
