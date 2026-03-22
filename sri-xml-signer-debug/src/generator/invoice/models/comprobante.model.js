// models/invoice.export class.ts
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { Digits, IsArray, IsDate, IsEnum, IsNumber, IsNumericString, IsOptional, IsRequired, IsString, Length, MaxDigits, ValidateNested, } from "../../../lightweight-validator/decorators";
import { ENV_ENUM, TAX_CODE_ENUM, CONTRIBUYENTE_RIMPE_ENUM, OBLIGADO_CONTABILIDAD_ENUM, PAYMENT_METHOD_CODE_ENUM, IDENTIFICATION_CODE_ENUM, CODIGO_RETENCION_ENUM, IMPUESTO_A_RETENER_ENUM, } from "../../enums";
let InfoTributariaModel = (() => {
    var _a;
    let _ambiente_decorators;
    let _ambiente_initializers = [];
    let _ambiente_extraInitializers = [];
    let _razonSocial_decorators;
    let _razonSocial_initializers = [];
    let _razonSocial_extraInitializers = [];
    let _nombreComercial_decorators;
    let _nombreComercial_initializers = [];
    let _nombreComercial_extraInitializers = [];
    let _ruc_decorators;
    let _ruc_initializers = [];
    let _ruc_extraInitializers = [];
    let _estab_decorators;
    let _estab_initializers = [];
    let _estab_extraInitializers = [];
    let _ptoEmi_decorators;
    let _ptoEmi_initializers = [];
    let _ptoEmi_extraInitializers = [];
    let _secuencial_decorators;
    let _secuencial_initializers = [];
    let _secuencial_extraInitializers = [];
    let _dirMatriz_decorators;
    let _dirMatriz_initializers = [];
    let _dirMatriz_extraInitializers = [];
    let _agenteRetencion_decorators;
    let _agenteRetencion_initializers = [];
    let _agenteRetencion_extraInitializers = [];
    let _contribuyenteRimpe_decorators;
    let _contribuyenteRimpe_initializers = [];
    let _contribuyenteRimpe_extraInitializers = [];
    return _a = class InfoTributariaModel {
            constructor() {
                this.ambiente = __runInitializers(this, _ambiente_initializers, void 0);
                this.razonSocial = (__runInitializers(this, _ambiente_extraInitializers), __runInitializers(this, _razonSocial_initializers, void 0));
                this.nombreComercial = (__runInitializers(this, _razonSocial_extraInitializers), __runInitializers(this, _nombreComercial_initializers, void 0));
                this.ruc = (__runInitializers(this, _nombreComercial_extraInitializers), __runInitializers(this, _ruc_initializers, void 0));
                this.estab = (__runInitializers(this, _ruc_extraInitializers), __runInitializers(this, _estab_initializers, void 0));
                this.ptoEmi = (__runInitializers(this, _estab_extraInitializers), __runInitializers(this, _ptoEmi_initializers, void 0));
                this.secuencial = (__runInitializers(this, _ptoEmi_extraInitializers), __runInitializers(this, _secuencial_initializers, void 0));
                this.dirMatriz = (__runInitializers(this, _secuencial_extraInitializers), __runInitializers(this, _dirMatriz_initializers, void 0));
                this.agenteRetencion = (__runInitializers(this, _dirMatriz_extraInitializers), __runInitializers(this, _agenteRetencion_initializers, void 0));
                this.contribuyenteRimpe = (__runInitializers(this, _agenteRetencion_extraInitializers), __runInitializers(this, _contribuyenteRimpe_initializers, void 0));
                __runInitializers(this, _contribuyenteRimpe_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _ambiente_decorators = [IsRequired(), IsEnum(ENV_ENUM)];
            _razonSocial_decorators = [IsString(), Length({ max: 300 }), IsRequired()];
            _nombreComercial_decorators = [IsString(), Length({ max: 300 }), IsOptional()];
            _ruc_decorators = [IsString(), Length({ exact: 13 }), IsNumericString(), IsRequired()];
            _estab_decorators = [IsString(), Length({ exact: 3 }), IsNumericString(), IsRequired()];
            _ptoEmi_decorators = [IsString(), Length({ exact: 3 }), IsNumericString(), IsRequired()];
            _secuencial_decorators = [IsString(), Length({ exact: 9 }), IsNumericString(), IsRequired()];
            _dirMatriz_decorators = [IsString(), Length({ max: 300 }), IsRequired()];
            _agenteRetencion_decorators = [IsString(), Length({ min: 1, max: 8 }), IsNumericString(), IsOptional()];
            _contribuyenteRimpe_decorators = [IsEnum(CONTRIBUYENTE_RIMPE_ENUM), IsOptional()];
            __esDecorate(null, null, _ambiente_decorators, { kind: "field", name: "ambiente", static: false, private: false, access: { has: obj => "ambiente" in obj, get: obj => obj.ambiente, set: (obj, value) => { obj.ambiente = value; } }, metadata: _metadata }, _ambiente_initializers, _ambiente_extraInitializers);
            __esDecorate(null, null, _razonSocial_decorators, { kind: "field", name: "razonSocial", static: false, private: false, access: { has: obj => "razonSocial" in obj, get: obj => obj.razonSocial, set: (obj, value) => { obj.razonSocial = value; } }, metadata: _metadata }, _razonSocial_initializers, _razonSocial_extraInitializers);
            __esDecorate(null, null, _nombreComercial_decorators, { kind: "field", name: "nombreComercial", static: false, private: false, access: { has: obj => "nombreComercial" in obj, get: obj => obj.nombreComercial, set: (obj, value) => { obj.nombreComercial = value; } }, metadata: _metadata }, _nombreComercial_initializers, _nombreComercial_extraInitializers);
            __esDecorate(null, null, _ruc_decorators, { kind: "field", name: "ruc", static: false, private: false, access: { has: obj => "ruc" in obj, get: obj => obj.ruc, set: (obj, value) => { obj.ruc = value; } }, metadata: _metadata }, _ruc_initializers, _ruc_extraInitializers);
            __esDecorate(null, null, _estab_decorators, { kind: "field", name: "estab", static: false, private: false, access: { has: obj => "estab" in obj, get: obj => obj.estab, set: (obj, value) => { obj.estab = value; } }, metadata: _metadata }, _estab_initializers, _estab_extraInitializers);
            __esDecorate(null, null, _ptoEmi_decorators, { kind: "field", name: "ptoEmi", static: false, private: false, access: { has: obj => "ptoEmi" in obj, get: obj => obj.ptoEmi, set: (obj, value) => { obj.ptoEmi = value; } }, metadata: _metadata }, _ptoEmi_initializers, _ptoEmi_extraInitializers);
            __esDecorate(null, null, _secuencial_decorators, { kind: "field", name: "secuencial", static: false, private: false, access: { has: obj => "secuencial" in obj, get: obj => obj.secuencial, set: (obj, value) => { obj.secuencial = value; } }, metadata: _metadata }, _secuencial_initializers, _secuencial_extraInitializers);
            __esDecorate(null, null, _dirMatriz_decorators, { kind: "field", name: "dirMatriz", static: false, private: false, access: { has: obj => "dirMatriz" in obj, get: obj => obj.dirMatriz, set: (obj, value) => { obj.dirMatriz = value; } }, metadata: _metadata }, _dirMatriz_initializers, _dirMatriz_extraInitializers);
            __esDecorate(null, null, _agenteRetencion_decorators, { kind: "field", name: "agenteRetencion", static: false, private: false, access: { has: obj => "agenteRetencion" in obj, get: obj => obj.agenteRetencion, set: (obj, value) => { obj.agenteRetencion = value; } }, metadata: _metadata }, _agenteRetencion_initializers, _agenteRetencion_extraInitializers);
            __esDecorate(null, null, _contribuyenteRimpe_decorators, { kind: "field", name: "contribuyenteRimpe", static: false, private: false, access: { has: obj => "contribuyenteRimpe" in obj, get: obj => obj.contribuyenteRimpe, set: (obj, value) => { obj.contribuyenteRimpe = value; } }, metadata: _metadata }, _contribuyenteRimpe_initializers, _contribuyenteRimpe_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { InfoTributariaModel };
let TotalImpuestoModel = (() => {
    var _a;
    let _codigo_decorators;
    let _codigo_initializers = [];
    let _codigo_extraInitializers = [];
    let _codigoPorcentaje_decorators;
    let _codigoPorcentaje_initializers = [];
    let _codigoPorcentaje_extraInitializers = [];
    let _baseImponible_decorators;
    let _baseImponible_initializers = [];
    let _baseImponible_extraInitializers = [];
    let _valor_decorators;
    let _valor_initializers = [];
    let _valor_extraInitializers = [];
    let _descuentoAdicional_decorators;
    let _descuentoAdicional_initializers = [];
    let _descuentoAdicional_extraInitializers = [];
    return _a = class TotalImpuestoModel {
            constructor() {
                this.codigo = __runInitializers(this, _codigo_initializers, void 0);
                this.codigoPorcentaje = (__runInitializers(this, _codigo_extraInitializers), __runInitializers(this, _codigoPorcentaje_initializers, void 0)); //TODO: VALIDAR ACORDE DEL CODIGO
                this.baseImponible = (__runInitializers(this, _codigoPorcentaje_extraInitializers), __runInitializers(this, _baseImponible_initializers, void 0));
                this.valor = (__runInitializers(this, _baseImponible_extraInitializers), __runInitializers(this, _valor_initializers, void 0));
                this.descuentoAdicional = (__runInitializers(this, _valor_extraInitializers), __runInitializers(this, _descuentoAdicional_initializers, void 0)); //TODO: SOLO PARA EL CODIGO TAX_CODE_ENUM VAT= 2
                __runInitializers(this, _descuentoAdicional_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _codigo_decorators = [IsEnum(TAX_CODE_ENUM), IsRequired()];
            _codigoPorcentaje_decorators = [IsNumber(), MaxDigits(4), IsRequired()];
            _baseImponible_decorators = [IsNumber(), MaxDigits(14), IsRequired()];
            _valor_decorators = [IsNumber(), MaxDigits(14), IsRequired()];
            _descuentoAdicional_decorators = [IsNumber(), MaxDigits(14), IsOptional()];
            __esDecorate(null, null, _codigo_decorators, { kind: "field", name: "codigo", static: false, private: false, access: { has: obj => "codigo" in obj, get: obj => obj.codigo, set: (obj, value) => { obj.codigo = value; } }, metadata: _metadata }, _codigo_initializers, _codigo_extraInitializers);
            __esDecorate(null, null, _codigoPorcentaje_decorators, { kind: "field", name: "codigoPorcentaje", static: false, private: false, access: { has: obj => "codigoPorcentaje" in obj, get: obj => obj.codigoPorcentaje, set: (obj, value) => { obj.codigoPorcentaje = value; } }, metadata: _metadata }, _codigoPorcentaje_initializers, _codigoPorcentaje_extraInitializers);
            __esDecorate(null, null, _baseImponible_decorators, { kind: "field", name: "baseImponible", static: false, private: false, access: { has: obj => "baseImponible" in obj, get: obj => obj.baseImponible, set: (obj, value) => { obj.baseImponible = value; } }, metadata: _metadata }, _baseImponible_initializers, _baseImponible_extraInitializers);
            __esDecorate(null, null, _valor_decorators, { kind: "field", name: "valor", static: false, private: false, access: { has: obj => "valor" in obj, get: obj => obj.valor, set: (obj, value) => { obj.valor = value; } }, metadata: _metadata }, _valor_initializers, _valor_extraInitializers);
            __esDecorate(null, null, _descuentoAdicional_decorators, { kind: "field", name: "descuentoAdicional", static: false, private: false, access: { has: obj => "descuentoAdicional" in obj, get: obj => obj.descuentoAdicional, set: (obj, value) => { obj.descuentoAdicional = value; } }, metadata: _metadata }, _descuentoAdicional_initializers, _descuentoAdicional_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { TotalImpuestoModel };
let TotalConImpuestosModel = (() => {
    var _a;
    let _totalImpuesto_decorators;
    let _totalImpuesto_initializers = [];
    let _totalImpuesto_extraInitializers = [];
    return _a = class TotalConImpuestosModel {
            constructor() {
                this.totalImpuesto = __runInitializers(this, _totalImpuesto_initializers, void 0);
                __runInitializers(this, _totalImpuesto_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _totalImpuesto_decorators = [IsArray(() => TotalImpuestoModel), IsRequired()];
            __esDecorate(null, null, _totalImpuesto_decorators, { kind: "field", name: "totalImpuesto", static: false, private: false, access: { has: obj => "totalImpuesto" in obj, get: obj => obj.totalImpuesto, set: (obj, value) => { obj.totalImpuesto = value; } }, metadata: _metadata }, _totalImpuesto_initializers, _totalImpuesto_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { TotalConImpuestosModel };
let PagoModel = (() => {
    var _a;
    let _formaPago_decorators;
    let _formaPago_initializers = [];
    let _formaPago_extraInitializers = [];
    let _total_decorators;
    let _total_initializers = [];
    let _total_extraInitializers = [];
    let _plazo_decorators;
    let _plazo_initializers = [];
    let _plazo_extraInitializers = [];
    let _unidadTiempo_decorators;
    let _unidadTiempo_initializers = [];
    let _unidadTiempo_extraInitializers = [];
    return _a = class PagoModel {
            constructor() {
                this.formaPago = __runInitializers(this, _formaPago_initializers, void 0);
                this.total = (__runInitializers(this, _formaPago_extraInitializers), __runInitializers(this, _total_initializers, void 0));
                this.plazo = (__runInitializers(this, _total_extraInitializers), __runInitializers(this, _plazo_initializers, void 0));
                this.unidadTiempo = (__runInitializers(this, _plazo_extraInitializers), __runInitializers(this, _unidadTiempo_initializers, void 0));
                __runInitializers(this, _unidadTiempo_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _formaPago_decorators = [IsEnum(PAYMENT_METHOD_CODE_ENUM), IsRequired()];
            _total_decorators = [IsNumber(), MaxDigits(14), IsRequired()];
            _plazo_decorators = [IsNumber(), MaxDigits(14), IsOptional()];
            _unidadTiempo_decorators = [IsString(), Length({ max: 10 }), IsOptional()];
            __esDecorate(null, null, _formaPago_decorators, { kind: "field", name: "formaPago", static: false, private: false, access: { has: obj => "formaPago" in obj, get: obj => obj.formaPago, set: (obj, value) => { obj.formaPago = value; } }, metadata: _metadata }, _formaPago_initializers, _formaPago_extraInitializers);
            __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: obj => "total" in obj, get: obj => obj.total, set: (obj, value) => { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
            __esDecorate(null, null, _plazo_decorators, { kind: "field", name: "plazo", static: false, private: false, access: { has: obj => "plazo" in obj, get: obj => obj.plazo, set: (obj, value) => { obj.plazo = value; } }, metadata: _metadata }, _plazo_initializers, _plazo_extraInitializers);
            __esDecorate(null, null, _unidadTiempo_decorators, { kind: "field", name: "unidadTiempo", static: false, private: false, access: { has: obj => "unidadTiempo" in obj, get: obj => obj.unidadTiempo, set: (obj, value) => { obj.unidadTiempo = value; } }, metadata: _metadata }, _unidadTiempo_initializers, _unidadTiempo_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { PagoModel };
let PagosModel = (() => {
    var _a;
    let _pago_decorators;
    let _pago_initializers = [];
    let _pago_extraInitializers = [];
    return _a = class PagosModel {
            constructor() {
                this.pago = __runInitializers(this, _pago_initializers, void 0);
                __runInitializers(this, _pago_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _pago_decorators = [IsArray(() => PagoModel), IsRequired()];
            __esDecorate(null, null, _pago_decorators, { kind: "field", name: "pago", static: false, private: false, access: { has: obj => "pago" in obj, get: obj => obj.pago, set: (obj, value) => { obj.pago = value; } }, metadata: _metadata }, _pago_initializers, _pago_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { PagosModel };
let InfoFacturaModel = (() => {
    var _a;
    let _fechaEmision_decorators;
    let _fechaEmision_initializers = [];
    let _fechaEmision_extraInitializers = [];
    let _dirEstablecimiento_decorators;
    let _dirEstablecimiento_initializers = [];
    let _dirEstablecimiento_extraInitializers = [];
    let _contribuyenteEspecial_decorators;
    let _contribuyenteEspecial_initializers = [];
    let _contribuyenteEspecial_extraInitializers = [];
    let _obligadoContabilidad_decorators;
    let _obligadoContabilidad_initializers = [];
    let _obligadoContabilidad_extraInitializers = [];
    let _tipoIdentificacionComprador_decorators;
    let _tipoIdentificacionComprador_initializers = [];
    let _tipoIdentificacionComprador_extraInitializers = [];
    let _guiaRemision_decorators;
    let _guiaRemision_initializers = [];
    let _guiaRemision_extraInitializers = [];
    let _razonSocialComprador_decorators;
    let _razonSocialComprador_initializers = [];
    let _razonSocialComprador_extraInitializers = [];
    let _identificacionComprador_decorators;
    let _identificacionComprador_initializers = [];
    let _identificacionComprador_extraInitializers = [];
    let _direccionComprador_decorators;
    let _direccionComprador_initializers = [];
    let _direccionComprador_extraInitializers = [];
    let _totalSinImpuestos_decorators;
    let _totalSinImpuestos_initializers = [];
    let _totalSinImpuestos_extraInitializers = [];
    let _totalDescuento_decorators;
    let _totalDescuento_initializers = [];
    let _totalDescuento_extraInitializers = [];
    let _totalConImpuestos_decorators;
    let _totalConImpuestos_initializers = [];
    let _totalConImpuestos_extraInitializers = [];
    let _propina_decorators;
    let _propina_initializers = [];
    let _propina_extraInitializers = [];
    let _importeTotal_decorators;
    let _importeTotal_initializers = [];
    let _importeTotal_extraInitializers = [];
    let _moneda_decorators;
    let _moneda_initializers = [];
    let _moneda_extraInitializers = [];
    let _pagos_decorators;
    let _pagos_initializers = [];
    let _pagos_extraInitializers = [];
    let _valorRetIva_decorators;
    let _valorRetIva_initializers = [];
    let _valorRetIva_extraInitializers = [];
    let _valorRetRenta_decorators;
    let _valorRetRenta_initializers = [];
    let _valorRetRenta_extraInitializers = [];
    return _a = class InfoFacturaModel {
            constructor() {
                this.fechaEmision = __runInitializers(this, _fechaEmision_initializers, void 0);
                this.dirEstablecimiento = (__runInitializers(this, _fechaEmision_extraInitializers), __runInitializers(this, _dirEstablecimiento_initializers, void 0));
                this.contribuyenteEspecial = (__runInitializers(this, _dirEstablecimiento_extraInitializers), __runInitializers(this, _contribuyenteEspecial_initializers, void 0));
                this.obligadoContabilidad = (__runInitializers(this, _contribuyenteEspecial_extraInitializers), __runInitializers(this, _obligadoContabilidad_initializers, void 0));
                // @IsBoolean()
                // @IsOptional()
                // EXPORTACION: boolean;
                // @IsString()
                // @IsOptional()
                // comercioExterior?: "EXPORTADOR";
                // @IsString()
                // @IsOptional()
                // incoTermFactura?: string;
                // @IsString()
                // @IsOptional()
                // lugarIncoTerm?: string;
                // @IsString()
                // @IsOptional()
                // paisOrigen?: string;
                // @IsString()
                // @IsOptional()
                // puertoEmbarque?: string;
                // @IsString()
                // @IsOptional()
                // puertoDestino?: string;
                // @IsString()
                // @IsOptional()
                // paisDestino?: string;
                // @IsString()
                // @IsOptional()
                // paisAdquisicion?: string;
                // @IsString()
                // @IsOptional()
                // incoTermTotalSinImpuestos?: string;
                // @IsNumber()
                // @IsOptional()
                // fleteInternacional?: number;
                // @IsNumber()
                // @IsOptional()
                // seguroInternacional?: number;
                // @IsNumber()
                // @IsOptional()
                // gastosAduaneros?: number;
                // @IsNumber()
                // @IsOptional()
                // gastosTransporteOtros?: number;
                this.tipoIdentificacionComprador = (__runInitializers(this, _obligadoContabilidad_extraInitializers), __runInitializers(this, _tipoIdentificacionComprador_initializers, void 0));
                this.guiaRemision = (__runInitializers(this, _tipoIdentificacionComprador_extraInitializers), __runInitializers(this, _guiaRemision_initializers, void 0)); //TODO: validacion segun formato
                this.razonSocialComprador = (__runInitializers(this, _guiaRemision_extraInitializers), __runInitializers(this, _razonSocialComprador_initializers, void 0));
                this.identificacionComprador = (__runInitializers(this, _razonSocialComprador_extraInitializers), __runInitializers(this, _identificacionComprador_initializers, void 0));
                this.direccionComprador = (__runInitializers(this, _identificacionComprador_extraInitializers), __runInitializers(this, _direccionComprador_initializers, void 0));
                this.totalSinImpuestos = (__runInitializers(this, _direccionComprador_extraInitializers), __runInitializers(this, _totalSinImpuestos_initializers, void 0));
                this.totalDescuento = (__runInitializers(this, _totalSinImpuestos_extraInitializers), __runInitializers(this, _totalDescuento_initializers, void 0));
                this.totalConImpuestos = (__runInitializers(this, _totalDescuento_extraInitializers), __runInitializers(this, _totalConImpuestos_initializers, void 0));
                this.propina = (__runInitializers(this, _totalConImpuestos_extraInitializers), __runInitializers(this, _propina_initializers, void 0));
                this.importeTotal = (__runInitializers(this, _propina_extraInitializers), __runInitializers(this, _importeTotal_initializers, void 0));
                this.moneda = (__runInitializers(this, _importeTotal_extraInitializers), __runInitializers(this, _moneda_initializers, void 0));
                this.pagos = (__runInitializers(this, _moneda_extraInitializers), __runInitializers(this, _pagos_initializers, void 0));
                this.valorRetIva = (__runInitializers(this, _pagos_extraInitializers), __runInitializers(this, _valorRetIva_initializers, void 0));
                this.valorRetRenta = (__runInitializers(this, _valorRetIva_extraInitializers), __runInitializers(this, _valorRetRenta_initializers, void 0));
                __runInitializers(this, _valorRetRenta_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _fechaEmision_decorators = [IsDate(), IsRequired()];
            _dirEstablecimiento_decorators = [IsString(), Length({ max: 300 }), IsOptional()];
            _contribuyenteEspecial_decorators = [IsString(), Length({ min: 3, max: 13 }), IsOptional()];
            _obligadoContabilidad_decorators = [IsEnum(OBLIGADO_CONTABILIDAD_ENUM), IsOptional()];
            _tipoIdentificacionComprador_decorators = [IsEnum(IDENTIFICATION_CODE_ENUM), IsRequired()];
            _guiaRemision_decorators = [IsString(), Length({ exact: 17 }), IsOptional()];
            _razonSocialComprador_decorators = [IsString(), Length({ max: 300 }), IsRequired()];
            _identificacionComprador_decorators = [IsString(), Length({ max: 20 }), IsRequired()];
            _direccionComprador_decorators = [IsString(), Length({ max: 300 }), IsOptional()];
            _totalSinImpuestos_decorators = [IsNumber(), MaxDigits(14), IsRequired()];
            _totalDescuento_decorators = [IsNumber(), MaxDigits(14), IsRequired()];
            _totalConImpuestos_decorators = [ValidateNested(() => TotalConImpuestosModel), IsRequired()];
            _propina_decorators = [IsNumber(), MaxDigits(14), IsRequired()];
            _importeTotal_decorators = [IsNumber(), MaxDigits(14), IsRequired()];
            _moneda_decorators = [IsString(), MaxDigits(15), IsOptional()];
            _pagos_decorators = [ValidateNested(() => PagosModel), IsRequired()];
            _valorRetIva_decorators = [IsNumber(), Digits({ integer: 15, fraction: 2 }), IsOptional()];
            _valorRetRenta_decorators = [IsNumber(), Digits({ integer: 15, fraction: 2 }), IsOptional()];
            __esDecorate(null, null, _fechaEmision_decorators, { kind: "field", name: "fechaEmision", static: false, private: false, access: { has: obj => "fechaEmision" in obj, get: obj => obj.fechaEmision, set: (obj, value) => { obj.fechaEmision = value; } }, metadata: _metadata }, _fechaEmision_initializers, _fechaEmision_extraInitializers);
            __esDecorate(null, null, _dirEstablecimiento_decorators, { kind: "field", name: "dirEstablecimiento", static: false, private: false, access: { has: obj => "dirEstablecimiento" in obj, get: obj => obj.dirEstablecimiento, set: (obj, value) => { obj.dirEstablecimiento = value; } }, metadata: _metadata }, _dirEstablecimiento_initializers, _dirEstablecimiento_extraInitializers);
            __esDecorate(null, null, _contribuyenteEspecial_decorators, { kind: "field", name: "contribuyenteEspecial", static: false, private: false, access: { has: obj => "contribuyenteEspecial" in obj, get: obj => obj.contribuyenteEspecial, set: (obj, value) => { obj.contribuyenteEspecial = value; } }, metadata: _metadata }, _contribuyenteEspecial_initializers, _contribuyenteEspecial_extraInitializers);
            __esDecorate(null, null, _obligadoContabilidad_decorators, { kind: "field", name: "obligadoContabilidad", static: false, private: false, access: { has: obj => "obligadoContabilidad" in obj, get: obj => obj.obligadoContabilidad, set: (obj, value) => { obj.obligadoContabilidad = value; } }, metadata: _metadata }, _obligadoContabilidad_initializers, _obligadoContabilidad_extraInitializers);
            __esDecorate(null, null, _tipoIdentificacionComprador_decorators, { kind: "field", name: "tipoIdentificacionComprador", static: false, private: false, access: { has: obj => "tipoIdentificacionComprador" in obj, get: obj => obj.tipoIdentificacionComprador, set: (obj, value) => { obj.tipoIdentificacionComprador = value; } }, metadata: _metadata }, _tipoIdentificacionComprador_initializers, _tipoIdentificacionComprador_extraInitializers);
            __esDecorate(null, null, _guiaRemision_decorators, { kind: "field", name: "guiaRemision", static: false, private: false, access: { has: obj => "guiaRemision" in obj, get: obj => obj.guiaRemision, set: (obj, value) => { obj.guiaRemision = value; } }, metadata: _metadata }, _guiaRemision_initializers, _guiaRemision_extraInitializers);
            __esDecorate(null, null, _razonSocialComprador_decorators, { kind: "field", name: "razonSocialComprador", static: false, private: false, access: { has: obj => "razonSocialComprador" in obj, get: obj => obj.razonSocialComprador, set: (obj, value) => { obj.razonSocialComprador = value; } }, metadata: _metadata }, _razonSocialComprador_initializers, _razonSocialComprador_extraInitializers);
            __esDecorate(null, null, _identificacionComprador_decorators, { kind: "field", name: "identificacionComprador", static: false, private: false, access: { has: obj => "identificacionComprador" in obj, get: obj => obj.identificacionComprador, set: (obj, value) => { obj.identificacionComprador = value; } }, metadata: _metadata }, _identificacionComprador_initializers, _identificacionComprador_extraInitializers);
            __esDecorate(null, null, _direccionComprador_decorators, { kind: "field", name: "direccionComprador", static: false, private: false, access: { has: obj => "direccionComprador" in obj, get: obj => obj.direccionComprador, set: (obj, value) => { obj.direccionComprador = value; } }, metadata: _metadata }, _direccionComprador_initializers, _direccionComprador_extraInitializers);
            __esDecorate(null, null, _totalSinImpuestos_decorators, { kind: "field", name: "totalSinImpuestos", static: false, private: false, access: { has: obj => "totalSinImpuestos" in obj, get: obj => obj.totalSinImpuestos, set: (obj, value) => { obj.totalSinImpuestos = value; } }, metadata: _metadata }, _totalSinImpuestos_initializers, _totalSinImpuestos_extraInitializers);
            __esDecorate(null, null, _totalDescuento_decorators, { kind: "field", name: "totalDescuento", static: false, private: false, access: { has: obj => "totalDescuento" in obj, get: obj => obj.totalDescuento, set: (obj, value) => { obj.totalDescuento = value; } }, metadata: _metadata }, _totalDescuento_initializers, _totalDescuento_extraInitializers);
            __esDecorate(null, null, _totalConImpuestos_decorators, { kind: "field", name: "totalConImpuestos", static: false, private: false, access: { has: obj => "totalConImpuestos" in obj, get: obj => obj.totalConImpuestos, set: (obj, value) => { obj.totalConImpuestos = value; } }, metadata: _metadata }, _totalConImpuestos_initializers, _totalConImpuestos_extraInitializers);
            __esDecorate(null, null, _propina_decorators, { kind: "field", name: "propina", static: false, private: false, access: { has: obj => "propina" in obj, get: obj => obj.propina, set: (obj, value) => { obj.propina = value; } }, metadata: _metadata }, _propina_initializers, _propina_extraInitializers);
            __esDecorate(null, null, _importeTotal_decorators, { kind: "field", name: "importeTotal", static: false, private: false, access: { has: obj => "importeTotal" in obj, get: obj => obj.importeTotal, set: (obj, value) => { obj.importeTotal = value; } }, metadata: _metadata }, _importeTotal_initializers, _importeTotal_extraInitializers);
            __esDecorate(null, null, _moneda_decorators, { kind: "field", name: "moneda", static: false, private: false, access: { has: obj => "moneda" in obj, get: obj => obj.moneda, set: (obj, value) => { obj.moneda = value; } }, metadata: _metadata }, _moneda_initializers, _moneda_extraInitializers);
            __esDecorate(null, null, _pagos_decorators, { kind: "field", name: "pagos", static: false, private: false, access: { has: obj => "pagos" in obj, get: obj => obj.pagos, set: (obj, value) => { obj.pagos = value; } }, metadata: _metadata }, _pagos_initializers, _pagos_extraInitializers);
            __esDecorate(null, null, _valorRetIva_decorators, { kind: "field", name: "valorRetIva", static: false, private: false, access: { has: obj => "valorRetIva" in obj, get: obj => obj.valorRetIva, set: (obj, value) => { obj.valorRetIva = value; } }, metadata: _metadata }, _valorRetIva_initializers, _valorRetIva_extraInitializers);
            __esDecorate(null, null, _valorRetRenta_decorators, { kind: "field", name: "valorRetRenta", static: false, private: false, access: { has: obj => "valorRetRenta" in obj, get: obj => obj.valorRetRenta, set: (obj, value) => { obj.valorRetRenta = value; } }, metadata: _metadata }, _valorRetRenta_initializers, _valorRetRenta_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { InfoFacturaModel };
let DetAdicionalModel = (() => {
    var _a;
    let _nombre_decorators;
    let _nombre_initializers = [];
    let _nombre_extraInitializers = [];
    let _valor_decorators;
    let _valor_initializers = [];
    let _valor_extraInitializers = [];
    return _a = class DetAdicionalModel {
            constructor() {
                this.nombre = __runInitializers(this, _nombre_initializers, void 0);
                this.valor = (__runInitializers(this, _nombre_extraInitializers), __runInitializers(this, _valor_initializers, void 0));
                __runInitializers(this, _valor_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nombre_decorators = [IsString(), Length({ max: 300 }), IsRequired()];
            _valor_decorators = [IsString(), Length({ max: 300 }), IsRequired()];
            __esDecorate(null, null, _nombre_decorators, { kind: "field", name: "nombre", static: false, private: false, access: { has: obj => "nombre" in obj, get: obj => obj.nombre, set: (obj, value) => { obj.nombre = value; } }, metadata: _metadata }, _nombre_initializers, _nombre_extraInitializers);
            __esDecorate(null, null, _valor_decorators, { kind: "field", name: "valor", static: false, private: false, access: { has: obj => "valor" in obj, get: obj => obj.valor, set: (obj, value) => { obj.valor = value; } }, metadata: _metadata }, _valor_initializers, _valor_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { DetAdicionalModel };
let ImpuestoDetalleModel = (() => {
    var _a;
    let _codigo_decorators;
    let _codigo_initializers = [];
    let _codigo_extraInitializers = [];
    let _codigoPorcentaje_decorators;
    let _codigoPorcentaje_initializers = [];
    let _codigoPorcentaje_extraInitializers = [];
    let _tarifa_decorators;
    let _tarifa_initializers = [];
    let _tarifa_extraInitializers = [];
    let _baseImponible_decorators;
    let _baseImponible_initializers = [];
    let _baseImponible_extraInitializers = [];
    let _valor_decorators;
    let _valor_initializers = [];
    let _valor_extraInitializers = [];
    return _a = class ImpuestoDetalleModel {
            constructor() {
                this.codigo = __runInitializers(this, _codigo_initializers, void 0);
                this.codigoPorcentaje = (__runInitializers(this, _codigo_extraInitializers), __runInitializers(this, _codigoPorcentaje_initializers, void 0)); //TODO: validar tambien a corde con el TAX_CODE_ENUM vat = 2
                this.tarifa = (__runInitializers(this, _codigoPorcentaje_extraInitializers), __runInitializers(this, _tarifa_initializers, void 0)); //TODO: TIENE QUE TENER MAX 4 2 ENTEROS Y DOS DECIMALES
                this.baseImponible = (__runInitializers(this, _tarifa_extraInitializers), __runInitializers(this, _baseImponible_initializers, void 0));
                this.valor = (__runInitializers(this, _baseImponible_extraInitializers), __runInitializers(this, _valor_initializers, void 0));
                __runInitializers(this, _valor_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _codigo_decorators = [IsEnum(TAX_CODE_ENUM), IsRequired()];
            _codigoPorcentaje_decorators = [IsNumber(), MaxDigits(4), IsRequired()];
            _tarifa_decorators = [IsNumber(), Digits({ integer: 2, fraction: 2 }), IsRequired()];
            _baseImponible_decorators = [IsNumber(), MaxDigits(14), IsRequired()];
            _valor_decorators = [IsNumber(), MaxDigits(14), IsRequired()];
            __esDecorate(null, null, _codigo_decorators, { kind: "field", name: "codigo", static: false, private: false, access: { has: obj => "codigo" in obj, get: obj => obj.codigo, set: (obj, value) => { obj.codigo = value; } }, metadata: _metadata }, _codigo_initializers, _codigo_extraInitializers);
            __esDecorate(null, null, _codigoPorcentaje_decorators, { kind: "field", name: "codigoPorcentaje", static: false, private: false, access: { has: obj => "codigoPorcentaje" in obj, get: obj => obj.codigoPorcentaje, set: (obj, value) => { obj.codigoPorcentaje = value; } }, metadata: _metadata }, _codigoPorcentaje_initializers, _codigoPorcentaje_extraInitializers);
            __esDecorate(null, null, _tarifa_decorators, { kind: "field", name: "tarifa", static: false, private: false, access: { has: obj => "tarifa" in obj, get: obj => obj.tarifa, set: (obj, value) => { obj.tarifa = value; } }, metadata: _metadata }, _tarifa_initializers, _tarifa_extraInitializers);
            __esDecorate(null, null, _baseImponible_decorators, { kind: "field", name: "baseImponible", static: false, private: false, access: { has: obj => "baseImponible" in obj, get: obj => obj.baseImponible, set: (obj, value) => { obj.baseImponible = value; } }, metadata: _metadata }, _baseImponible_initializers, _baseImponible_extraInitializers);
            __esDecorate(null, null, _valor_decorators, { kind: "field", name: "valor", static: false, private: false, access: { has: obj => "valor" in obj, get: obj => obj.valor, set: (obj, value) => { obj.valor = value; } }, metadata: _metadata }, _valor_initializers, _valor_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { ImpuestoDetalleModel };
let DetallesAdicionalesModel = (() => {
    var _a;
    let _detAdicional_decorators;
    let _detAdicional_initializers = [];
    let _detAdicional_extraInitializers = [];
    return _a = class DetallesAdicionalesModel {
            constructor() {
                this.detAdicional = __runInitializers(this, _detAdicional_initializers, void 0);
                __runInitializers(this, _detAdicional_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _detAdicional_decorators = [IsArray(() => DetAdicionalModel), IsRequired()];
            __esDecorate(null, null, _detAdicional_decorators, { kind: "field", name: "detAdicional", static: false, private: false, access: { has: obj => "detAdicional" in obj, get: obj => obj.detAdicional, set: (obj, value) => { obj.detAdicional = value; } }, metadata: _metadata }, _detAdicional_initializers, _detAdicional_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { DetallesAdicionalesModel };
let ImpuestosModel = (() => {
    var _a;
    let _impuesto_decorators;
    let _impuesto_initializers = [];
    let _impuesto_extraInitializers = [];
    return _a = class ImpuestosModel {
            constructor() {
                this.impuesto = __runInitializers(this, _impuesto_initializers, void 0);
                __runInitializers(this, _impuesto_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _impuesto_decorators = [IsArray(() => ImpuestoDetalleModel), IsRequired()];
            __esDecorate(null, null, _impuesto_decorators, { kind: "field", name: "impuesto", static: false, private: false, access: { has: obj => "impuesto" in obj, get: obj => obj.impuesto, set: (obj, value) => { obj.impuesto = value; } }, metadata: _metadata }, _impuesto_initializers, _impuesto_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { ImpuestosModel };
let DetalleModel = (() => {
    var _a;
    let _codigoPrincipal_decorators;
    let _codigoPrincipal_initializers = [];
    let _codigoPrincipal_extraInitializers = [];
    let _codigoAuxiliar_decorators;
    let _codigoAuxiliar_initializers = [];
    let _codigoAuxiliar_extraInitializers = [];
    let _descripcion_decorators;
    let _descripcion_initializers = [];
    let _descripcion_extraInitializers = [];
    let _cantidad_decorators;
    let _cantidad_initializers = [];
    let _cantidad_extraInitializers = [];
    let _precioUnitario_decorators;
    let _precioUnitario_initializers = [];
    let _precioUnitario_extraInitializers = [];
    let _descuento_decorators;
    let _descuento_initializers = [];
    let _descuento_extraInitializers = [];
    let _precioTotalSinImpuesto_decorators;
    let _precioTotalSinImpuesto_initializers = [];
    let _precioTotalSinImpuesto_extraInitializers = [];
    let _detallesAdicionales_decorators;
    let _detallesAdicionales_initializers = [];
    let _detallesAdicionales_extraInitializers = [];
    let _impuestos_decorators;
    let _impuestos_initializers = [];
    let _impuestos_extraInitializers = [];
    return _a = class DetalleModel {
            constructor() {
                this.codigoPrincipal = __runInitializers(this, _codigoPrincipal_initializers, void 0);
                this.codigoAuxiliar = (__runInitializers(this, _codigoPrincipal_extraInitializers), __runInitializers(this, _codigoAuxiliar_initializers, void 0));
                this.descripcion = (__runInitializers(this, _codigoAuxiliar_extraInitializers), __runInitializers(this, _descripcion_initializers, void 0));
                this.cantidad = (__runInitializers(this, _descripcion_extraInitializers), __runInitializers(this, _cantidad_initializers, void 0));
                this.precioUnitario = (__runInitializers(this, _cantidad_extraInitializers), __runInitializers(this, _precioUnitario_initializers, void 0));
                this.descuento = (__runInitializers(this, _precioUnitario_extraInitializers), __runInitializers(this, _descuento_initializers, void 0));
                this.precioTotalSinImpuesto = (__runInitializers(this, _descuento_extraInitializers), __runInitializers(this, _precioTotalSinImpuesto_initializers, void 0));
                this.detallesAdicionales = (__runInitializers(this, _precioTotalSinImpuesto_extraInitializers), __runInitializers(this, _detallesAdicionales_initializers, void 0));
                this.impuestos = (__runInitializers(this, _detallesAdicionales_extraInitializers), __runInitializers(this, _impuestos_initializers, void 0));
                __runInitializers(this, _impuestos_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _codigoPrincipal_decorators = [IsString(), Length({ max: 25 }), IsRequired()];
            _codigoAuxiliar_decorators = [IsString(), Length({ max: 25 }), IsOptional()];
            _descripcion_decorators = [IsString(), Length({ max: 300 }), IsRequired()];
            _cantidad_decorators = [IsNumber(), MaxDigits(14), IsRequired()];
            _precioUnitario_decorators = [IsNumber(), MaxDigits(14), IsRequired()];
            _descuento_decorators = [IsNumber(), MaxDigits(14), IsRequired()];
            _precioTotalSinImpuesto_decorators = [IsNumber(), MaxDigits(14), IsRequired()];
            _detallesAdicionales_decorators = [ValidateNested(() => DetallesAdicionalesModel), IsOptional()];
            _impuestos_decorators = [ValidateNested(() => ImpuestosModel), IsRequired()];
            __esDecorate(null, null, _codigoPrincipal_decorators, { kind: "field", name: "codigoPrincipal", static: false, private: false, access: { has: obj => "codigoPrincipal" in obj, get: obj => obj.codigoPrincipal, set: (obj, value) => { obj.codigoPrincipal = value; } }, metadata: _metadata }, _codigoPrincipal_initializers, _codigoPrincipal_extraInitializers);
            __esDecorate(null, null, _codigoAuxiliar_decorators, { kind: "field", name: "codigoAuxiliar", static: false, private: false, access: { has: obj => "codigoAuxiliar" in obj, get: obj => obj.codigoAuxiliar, set: (obj, value) => { obj.codigoAuxiliar = value; } }, metadata: _metadata }, _codigoAuxiliar_initializers, _codigoAuxiliar_extraInitializers);
            __esDecorate(null, null, _descripcion_decorators, { kind: "field", name: "descripcion", static: false, private: false, access: { has: obj => "descripcion" in obj, get: obj => obj.descripcion, set: (obj, value) => { obj.descripcion = value; } }, metadata: _metadata }, _descripcion_initializers, _descripcion_extraInitializers);
            __esDecorate(null, null, _cantidad_decorators, { kind: "field", name: "cantidad", static: false, private: false, access: { has: obj => "cantidad" in obj, get: obj => obj.cantidad, set: (obj, value) => { obj.cantidad = value; } }, metadata: _metadata }, _cantidad_initializers, _cantidad_extraInitializers);
            __esDecorate(null, null, _precioUnitario_decorators, { kind: "field", name: "precioUnitario", static: false, private: false, access: { has: obj => "precioUnitario" in obj, get: obj => obj.precioUnitario, set: (obj, value) => { obj.precioUnitario = value; } }, metadata: _metadata }, _precioUnitario_initializers, _precioUnitario_extraInitializers);
            __esDecorate(null, null, _descuento_decorators, { kind: "field", name: "descuento", static: false, private: false, access: { has: obj => "descuento" in obj, get: obj => obj.descuento, set: (obj, value) => { obj.descuento = value; } }, metadata: _metadata }, _descuento_initializers, _descuento_extraInitializers);
            __esDecorate(null, null, _precioTotalSinImpuesto_decorators, { kind: "field", name: "precioTotalSinImpuesto", static: false, private: false, access: { has: obj => "precioTotalSinImpuesto" in obj, get: obj => obj.precioTotalSinImpuesto, set: (obj, value) => { obj.precioTotalSinImpuesto = value; } }, metadata: _metadata }, _precioTotalSinImpuesto_initializers, _precioTotalSinImpuesto_extraInitializers);
            __esDecorate(null, null, _detallesAdicionales_decorators, { kind: "field", name: "detallesAdicionales", static: false, private: false, access: { has: obj => "detallesAdicionales" in obj, get: obj => obj.detallesAdicionales, set: (obj, value) => { obj.detallesAdicionales = value; } }, metadata: _metadata }, _detallesAdicionales_initializers, _detallesAdicionales_extraInitializers);
            __esDecorate(null, null, _impuestos_decorators, { kind: "field", name: "impuestos", static: false, private: false, access: { has: obj => "impuestos" in obj, get: obj => obj.impuestos, set: (obj, value) => { obj.impuestos = value; } }, metadata: _metadata }, _impuestos_initializers, _impuestos_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { DetalleModel };
let CampoAdicionalModel = (() => {
    var _a;
    let _nombre_decorators;
    let _nombre_initializers = [];
    let _nombre_extraInitializers = [];
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    return _a = class CampoAdicionalModel {
            constructor() {
                this.nombre = __runInitializers(this, _nombre_initializers, void 0);
                this.value = (__runInitializers(this, _nombre_extraInitializers), __runInitializers(this, _value_initializers, void 0));
                __runInitializers(this, _value_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nombre_decorators = [IsString(), Length({ max: 300 }), IsRequired()];
            _value_decorators = [IsString(), Length({ max: 300 }), IsRequired()];
            __esDecorate(null, null, _nombre_decorators, { kind: "field", name: "nombre", static: false, private: false, access: { has: obj => "nombre" in obj, get: obj => obj.nombre, set: (obj, value) => { obj.nombre = value; } }, metadata: _metadata }, _nombre_initializers, _nombre_extraInitializers);
            __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { CampoAdicionalModel };
let InfoAdicionalModel = (() => {
    var _a;
    let _campoAdicional_decorators;
    let _campoAdicional_initializers = [];
    let _campoAdicional_extraInitializers = [];
    return _a = class InfoAdicionalModel {
            constructor() {
                this.campoAdicional = __runInitializers(this, _campoAdicional_initializers, void 0);
                __runInitializers(this, _campoAdicional_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _campoAdicional_decorators = [IsArray(() => CampoAdicionalModel), IsRequired()];
            __esDecorate(null, null, _campoAdicional_decorators, { kind: "field", name: "campoAdicional", static: false, private: false, access: { has: obj => "campoAdicional" in obj, get: obj => obj.campoAdicional, set: (obj, value) => { obj.campoAdicional = value; } }, metadata: _metadata }, _campoAdicional_initializers, _campoAdicional_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { InfoAdicionalModel };
let DetallesModel = (() => {
    var _a;
    let _detalle_decorators;
    let _detalle_initializers = [];
    let _detalle_extraInitializers = [];
    return _a = class DetallesModel {
            constructor() {
                this.detalle = __runInitializers(this, _detalle_initializers, void 0);
                __runInitializers(this, _detalle_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _detalle_decorators = [IsArray(() => DetalleModel), IsRequired()];
            __esDecorate(null, null, _detalle_decorators, { kind: "field", name: "detalle", static: false, private: false, access: { has: obj => "detalle" in obj, get: obj => obj.detalle, set: (obj, value) => { obj.detalle = value; } }, metadata: _metadata }, _detalle_initializers, _detalle_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { DetallesModel };
let RetencionesModel = (() => {
    var _a;
    let _retencion_decorators;
    let _retencion_initializers = [];
    let _retencion_extraInitializers = [];
    return _a = class RetencionesModel {
            constructor() {
                this.retencion = __runInitializers(this, _retencion_initializers, void 0);
                __runInitializers(this, _retencion_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _retencion_decorators = [IsArray(() => RetencionModel), IsRequired()];
            __esDecorate(null, null, _retencion_decorators, { kind: "field", name: "retencion", static: false, private: false, access: { has: obj => "retencion" in obj, get: obj => obj.retencion, set: (obj, value) => { obj.retencion = value; } }, metadata: _metadata }, _retencion_initializers, _retencion_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { RetencionesModel };
let RetencionModel = (() => {
    var _a;
    let _codigo_decorators;
    let _codigo_initializers = [];
    let _codigo_extraInitializers = [];
    let _codigoPorcentaje_decorators;
    let _codigoPorcentaje_initializers = [];
    let _codigoPorcentaje_extraInitializers = [];
    let _tarifa_decorators;
    let _tarifa_initializers = [];
    let _tarifa_extraInitializers = [];
    let _valor_decorators;
    let _valor_initializers = [];
    let _valor_extraInitializers = [];
    return _a = class RetencionModel {
            constructor() {
                this.codigo = __runInitializers(this, _codigo_initializers, void 0);
                this.codigoPorcentaje = (__runInitializers(this, _codigo_extraInitializers), __runInitializers(this, _codigoPorcentaje_initializers, void 0)); //TODO: validar tambien a corde con el TAX_CODE_ENUM vat = 2
                this.tarifa = (__runInitializers(this, _codigoPorcentaje_extraInitializers), __runInitializers(this, _tarifa_initializers, void 0)); //TODO: TIENE QUE TENER MAX 4 2 ENTEROS Y DOS DECIMALES
                this.valor = (__runInitializers(this, _tarifa_extraInitializers), __runInitializers(this, _valor_initializers, void 0));
                __runInitializers(this, _valor_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _codigo_decorators = [IsEnum(IMPUESTO_A_RETENER_ENUM), IsRequired()];
            _codigoPorcentaje_decorators = [IsEnum(CODIGO_RETENCION_ENUM), IsRequired()];
            _tarifa_decorators = [IsNumber(), Digits({ integer: 3, fraction: 2 }), IsRequired()];
            _valor_decorators = [IsNumber(), Digits({ integer: 12, fraction: 2 }), IsRequired()];
            __esDecorate(null, null, _codigo_decorators, { kind: "field", name: "codigo", static: false, private: false, access: { has: obj => "codigo" in obj, get: obj => obj.codigo, set: (obj, value) => { obj.codigo = value; } }, metadata: _metadata }, _codigo_initializers, _codigo_extraInitializers);
            __esDecorate(null, null, _codigoPorcentaje_decorators, { kind: "field", name: "codigoPorcentaje", static: false, private: false, access: { has: obj => "codigoPorcentaje" in obj, get: obj => obj.codigoPorcentaje, set: (obj, value) => { obj.codigoPorcentaje = value; } }, metadata: _metadata }, _codigoPorcentaje_initializers, _codigoPorcentaje_extraInitializers);
            __esDecorate(null, null, _tarifa_decorators, { kind: "field", name: "tarifa", static: false, private: false, access: { has: obj => "tarifa" in obj, get: obj => obj.tarifa, set: (obj, value) => { obj.tarifa = value; } }, metadata: _metadata }, _tarifa_initializers, _tarifa_extraInitializers);
            __esDecorate(null, null, _valor_decorators, { kind: "field", name: "valor", static: false, private: false, access: { has: obj => "valor" in obj, get: obj => obj.valor, set: (obj, value) => { obj.valor = value; } }, metadata: _metadata }, _valor_initializers, _valor_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { RetencionModel };
let ComprobanteModel = (() => {
    var _a;
    let _infoTributaria_decorators;
    let _infoTributaria_initializers = [];
    let _infoTributaria_extraInitializers = [];
    let _infoFactura_decorators;
    let _infoFactura_initializers = [];
    let _infoFactura_extraInitializers = [];
    let _detalles_decorators;
    let _detalles_initializers = [];
    let _detalles_extraInitializers = [];
    let _retenciones_decorators;
    let _retenciones_initializers = [];
    let _retenciones_extraInitializers = [];
    let _infoAdicional_decorators;
    let _infoAdicional_initializers = [];
    let _infoAdicional_extraInitializers = [];
    return _a = class ComprobanteModel {
            constructor() {
                this.infoTributaria = __runInitializers(this, _infoTributaria_initializers, void 0);
                this.infoFactura = (__runInitializers(this, _infoTributaria_extraInitializers), __runInitializers(this, _infoFactura_initializers, void 0));
                this.detalles = (__runInitializers(this, _infoFactura_extraInitializers), __runInitializers(this, _detalles_initializers, void 0));
                this.retenciones = (__runInitializers(this, _detalles_extraInitializers), __runInitializers(this, _retenciones_initializers, void 0));
                this.infoAdicional = (__runInitializers(this, _retenciones_extraInitializers), __runInitializers(this, _infoAdicional_initializers, void 0));
                __runInitializers(this, _infoAdicional_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _infoTributaria_decorators = [ValidateNested(() => InfoTributariaModel), IsRequired()];
            _infoFactura_decorators = [ValidateNested(() => InfoFacturaModel), IsRequired()];
            _detalles_decorators = [ValidateNested(() => DetallesModel), IsRequired()];
            _retenciones_decorators = [ValidateNested(() => RetencionesModel), IsOptional()];
            _infoAdicional_decorators = [ValidateNested(() => InfoAdicionalModel), IsOptional()];
            __esDecorate(null, null, _infoTributaria_decorators, { kind: "field", name: "infoTributaria", static: false, private: false, access: { has: obj => "infoTributaria" in obj, get: obj => obj.infoTributaria, set: (obj, value) => { obj.infoTributaria = value; } }, metadata: _metadata }, _infoTributaria_initializers, _infoTributaria_extraInitializers);
            __esDecorate(null, null, _infoFactura_decorators, { kind: "field", name: "infoFactura", static: false, private: false, access: { has: obj => "infoFactura" in obj, get: obj => obj.infoFactura, set: (obj, value) => { obj.infoFactura = value; } }, metadata: _metadata }, _infoFactura_initializers, _infoFactura_extraInitializers);
            __esDecorate(null, null, _detalles_decorators, { kind: "field", name: "detalles", static: false, private: false, access: { has: obj => "detalles" in obj, get: obj => obj.detalles, set: (obj, value) => { obj.detalles = value; } }, metadata: _metadata }, _detalles_initializers, _detalles_extraInitializers);
            __esDecorate(null, null, _retenciones_decorators, { kind: "field", name: "retenciones", static: false, private: false, access: { has: obj => "retenciones" in obj, get: obj => obj.retenciones, set: (obj, value) => { obj.retenciones = value; } }, metadata: _metadata }, _retenciones_initializers, _retenciones_extraInitializers);
            __esDecorate(null, null, _infoAdicional_decorators, { kind: "field", name: "infoAdicional", static: false, private: false, access: { has: obj => "infoAdicional" in obj, get: obj => obj.infoAdicional, set: (obj, value) => { obj.infoAdicional = value; } }, metadata: _metadata }, _infoAdicional_initializers, _infoAdicional_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { ComprobanteModel };
