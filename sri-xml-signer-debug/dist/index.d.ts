import * as forge from 'node-forge';

interface ParsedP12Certificate {
    certificate: forge.pki.Certificate;
    privateKey: forge.pki.PrivateKey;
    issuerName: string;
    serialNumber: string;
    certificateX509: string;
    base64Der: string;
    publicKey: {
        modulus: string;
        exponent: string;
    };
}

interface SignatureIdentifiersInterface {
    signatureNumber: string;
    certificateNumber: string;
    signedInfoNumber: string;
    signedPropertiesNumber: string;
    signedPropertiesIdNumber: string;
    signatureValueNumber: string;
    referenceIdNumber: string;
    ObjectNumber: string;
}

interface SignXmlRequest {
    p12Buffer: Uint8Array;
    password: string;
    xmlBuffer: Uint8Array;
}

interface XadesBesResultInterface {
    xadesBes: string;
}

declare function signXml(cmd: SignXmlRequest): Promise<string>;

declare enum CodigoPais {
    AMERICAN_SAMOA = "016",
    BOUVET_ISLAND = "074",
    ARGENTINA = "101",
    BOLIVIA = "102",
    BRASIL = "103",
    CANAD = "104",
    COLOMBIA = "105",
    COSTA_RICA = "106",
    CUBA = "107",
    CHILE = "108",
    ANGUILA = "109",
    ESTADOS_UNIDOS = "110",
    GUATEMALA = "111",
    HAIT = "112",
    HONDURAS = "113",
    JAMAICA = "114",
    MALVINAS_ISLAS = "115",
    MXICO = "116",
    NICARAGUA = "117",
    PANAM = "118",
    PARAGUAY = "119",
    PER = "120",
    PUERTO_RICO = "121",
    REPBLICA_DOMINICANA = "122",
    EL_SALVADOR = "123",
    TRINIDAD_Y_TOBAGO = "124",
    URUGUAY = "125",
    VENEZUELA = "126",
    CURAZAO = "127",
    BAHAMAS = "129",
    BARBADOS = "130",
    GRANADA = "131",
    GUYANA = "132",
    SURINAM = "133",
    ANTIGUA_Y_BARBUDA = "134",
    BELICE = "135",
    DOMINICA = "136",
    SAN_CRISTOBAL_Y_NEVIS = "137",
    SANTA_LUCA = "138",
    SAN_VICENTE_Y_LAS_GRANAD = "139",
    ANTILLAS_HOLANDESAS = "140",
    ARUBA = "141",
    BERMUDA = "142",
    GUADALUPE = "143",
    GUYANA_FRANCESA = "144",
    ISLAS_CAIMN = "145",
    ISLAS_VIRGENES_BRITANICAS = "146",
    JOHNSTON_ISLA = "147",
    MARTINICA = "148",
    MONTSERRAT_ISLA = "149",
    TURCAS_Y_CAICOS_ISLAS = "151",
    VIRGENES_ISLAS_NORTAMER = "152",
    ALBANIA = "201",
    ALEMANIA = "202",
    AUSTRIA = "203",
    BLGICA = "204",
    BULGARIA = "205",
    ALBORAN_Y_PEREJIL = "207",
    DINAMARCA = "208",
    ESPAA = "209",
    FRANCIA = "211",
    FINLANDIA = "212",
    REINO_UNIDO = "213",
    GRECIA = "214",
    PAISES_BAJOS_HOLANDA = "215",
    HUNGRA = "216",
    IRLANDA = "217",
    ISLANDIA = "218",
    ITALIA = "219",
    LUXEMBURGO = "220",
    MALTA = "221",
    NORUEGA = "222",
    POLONIA = "223",
    PORTUGAL = "224",
    RUMANIA = "225",
    SUECIA = "226",
    SUIZA = "227",
    CANARIAS_ISLAS = "228",
    UCRANIA = "229",
    RUSIA = "230",
    YUGOSLAVIA = "231",
    ANDORRA = "233",
    LIECHTENSTEIN = "234",
    MNACO = "235",
    SAN_MARINO = "237",
    VATICANO_SANTA_SEDE = "238",
    GIBRALTAR = "239",
    BELARUS = "241",
    BOSNIA_Y_HERZEGOVINA = "242",
    CROACIA = "243",
    ESLOVENIA = "244",
    ESTONIA = "245",
    GEORGIA = "246",
    GROENLANDIA = "247",
    LETONIA = "248",
    LITUANIA = "249",
    MOLDOVA = "250",
    MACEDONIA = "251",
    ESLOVAQUIA = "252",
    ISLAS_FAROE = "253",
    FRENCH_SOUTHERN_TERRITORIES = "260",
    AFGANISTAN = "301",
    ARABIA_SAUDITA = "302",
    MYANMAR_BURMA = "303",
    CAMBOYA = "304",
    COREA_NORTE = "306",
    TAIWAN_CHINA = "307",
    FILIPINAS = "308",
    INDIA = "309",
    INDONESIA = "310",
    IRAK = "311",
    IRN_REPBLICA_ISLMICA = "312",
    ISRAEL = "313",
    JAPN = "314",
    JORDANIA = "315",
    KUWAIT = "316",
    LAOS_REP_POP_DEMOC = "317",
    LIBANO = "318",
    MALASIA = "319",
    MONGOLIA_MANCHURIA = "321",
    PAKISTN = "322",
    SIRIA = "323",
    TAILANDIA = "325",
    BAHREIN = "327",
    BANGLADESH = "328",
    BUTN = "329",
    COREA_DEL_SUR = "330",
    CHINA_POPULAR = "331",
    CHIPRE = "332",
    EMIRATOS_ARABES_UNIDOS = "333"
}

/**
 * Códigos de retención (IVA & Renta) según tablas oficiales
 */
declare enum CODIGO_RETENCION_ENUM {
    /**
     * 100% (aplica para retenciones de IVA de conformidad con Resolución No. NAC-DGERCGC21-00000063)
     * Tarifa en el XML: 1
     */
    IVA_CIENTO_POR_CIENTO_RESOLUCION = 3,
    /**
     * 12% (Retención de IVA presuntivo por Editores a Margen de Comercialización/Vocedores)
     * Tarifa en el XML: 0.12
     */
    IVA_DOCE_POR_CIENTO_PRESUNTIVO_EDITORES = 4,
    /**
     * 100% (Retención de IVA venta periódicos y/o revistas a Distribuidores)
     * Tarifa en el XML: 100
     */
    IVA_CIENTO_POR_CIENTO_DISTRIBUIDORES = 5,
    /**
     * 100% (Retención de IVA venta de periódicos y/o revistas a voceadores)
     * Tarifa en el XML: 100
     */
    IVA_CIENTO_POR_CIENTO_VOCEADORES = 6,
    /**
     * 0.002 (2 por mil)
     * Tarifa en el XML: 0.20
     */
    RENTA_DOS_POR_MIL = 327,
    /**
     * 0.003 (3 por mil)
     * Tarifa en el XML: 0.20
     */
    RENTA_TRES_POR_MIL = 328
}

declare enum CONTRIBUYENTE_RIMPE_ENUM {
    RIMPE_GENERAL = "CONTRIBUYENTE R\u00C9GIMEN RIMPE",
    RIMPE_POPULAR = "CONTRIBUYENTE NEGOCIO POPULAR - R\u00C9GIMEN RIMPE"
}

declare enum ENV_ENUM {
    TEST = 1,
    PROD = 2
}

declare enum IDENTIFICATION_CODE_ENUM {
    RUC = "04",
    CEDULA = "05",
    PASAPORTE = "06",
    CONSUMIDOR_FINAL = "07",
    EXTERIOR = "08"
}

declare enum IMPUESTO_A_RETENER_ENUM {
    IVA_PRESUNTIVO_Y_RENTA = 4
}

declare enum IVA_PERCENTAGE_CODE_ENUM {
    IVA_0 = "0",// 0%
    IVA_12 = "2",// 12%
    IVA_14 = "3",// 14%
    IVA_15 = "4",// 15%
    IVA_5 = "5",// 5%
    NO_OBJETO_IVA = "6",// No objeto de impuesto
    EXENTO_IVA = "7",// Exento de IVA
    IVA_DIFERENCIADO = "8",// IVA diferenciado
    IVA_13 = "10"
}

declare enum OBLIGADO_CONTABILIDAD_ENUM {
    SI = "SI",
    NO = "NO"
}

declare enum PAYMENT_METHOD_CODE_ENUM {
    SIN_UTILIZACION_DEL_SISTEMA_FINANCIERO = "01",
    COMPENSACION_DE_DEUDAS = "15",
    TARJETA_DE_DEBITO = "16",
    DINERO_ELECTRONICO = "17",
    TARJETA_PREPAGO = "18",
    TARJETA_DE_CREDITO = "19",
    OTROS_CON_SISTEMA_FINANCIERO = "20",
    ENDOSO_DE_TITULOS = "21"
}

declare enum TAX_CODE_ENUM {
    VAT = 2,// IVA
    ICE = 3,// Impuesto a los Consumos Especiales
    IRBPNR = 5
}

declare class InfoTributariaModel {
    ambiente: ENV_ENUM;
    razonSocial: string;
    nombreComercial?: string;
    ruc: string;
    estab: string;
    ptoEmi: string;
    secuencial: string;
    dirMatriz: string;
    agenteRetencion?: string;
    contribuyenteRimpe?: CONTRIBUYENTE_RIMPE_ENUM;
}
declare class TotalImpuestoModel {
    codigo: TAX_CODE_ENUM;
    codigoPorcentaje: number;
    baseImponible: number;
    valor: number;
    descuentoAdicional?: number;
}
declare class TotalConImpuestosModel {
    totalImpuesto: TotalImpuestoModel[];
}
declare class PagoModel {
    formaPago: PAYMENT_METHOD_CODE_ENUM;
    total: number;
    plazo?: number;
    unidadTiempo?: string;
}
declare class PagosModel {
    pago: PagoModel[];
}
declare class InfoFacturaModel {
    fechaEmision: Date;
    dirEstablecimiento: string;
    contribuyenteEspecial?: string;
    obligadoContabilidad?: OBLIGADO_CONTABILIDAD_ENUM;
    tipoIdentificacionComprador: IDENTIFICATION_CODE_ENUM;
    guiaRemision?: string;
    razonSocialComprador: string;
    identificacionComprador: string;
    direccionComprador?: string;
    totalSinImpuestos: number;
    totalDescuento: number;
    totalConImpuestos: TotalConImpuestosModel;
    propina: number;
    importeTotal: number;
    moneda?: string;
    pagos: PagosModel;
    valorRetIva?: number;
    valorRetRenta?: number;
}
declare class DetAdicionalModel {
    nombre: string;
    valor: string;
}
declare class ImpuestoDetalleModel {
    codigo: TAX_CODE_ENUM;
    codigoPorcentaje: number;
    tarifa: number;
    baseImponible: number;
    valor: number;
}
declare class DetallesAdicionalesModel {
    detAdicional: DetAdicionalModel[];
}
declare class ImpuestosModel {
    impuesto: ImpuestoDetalleModel[];
}
declare class DetalleModel {
    codigoPrincipal: string;
    codigoAuxiliar?: string;
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    descuento: number;
    precioTotalSinImpuesto: number;
    detallesAdicionales?: DetallesAdicionalesModel;
    impuestos: ImpuestosModel;
}
declare class CampoAdicionalModel {
    nombre: string;
    value: string;
}
declare class InfoAdicionalModel {
    campoAdicional: CampoAdicionalModel[];
}
declare class DetallesModel {
    detalle: DetalleModel[];
}
declare class RetencionesModel {
    retencion: RetencionModel[];
}
declare class RetencionModel {
    codigo: IMPUESTO_A_RETENER_ENUM;
    codigoPorcentaje: CODIGO_RETENCION_ENUM;
    tarifa: number;
    valor: number;
}
declare class ComprobanteModel {
    infoTributaria: InfoTributariaModel;
    infoFactura: InfoFacturaModel;
    detalles: DetallesModel;
    retenciones?: RetencionesModel;
    infoAdicional?: InfoAdicionalModel;
}

interface InvoiceSriBuilder {
    factura: FacturaInfo;
}
interface FacturaInfo {
    $: {
        id: string;
        version: string;
    };
    infoTributaria: InfoTributaria;
    infoFactura: InfoFactura;
    detalles: Detalles;
    retenciones: Retenciones;
    infoAdicional: InfoAdicional;
}
declare class Retenciones {
    retencion: Retencion[];
}
declare class Retencion {
    codigo: IMPUESTO_A_RETENER_ENUM;
    codigoPorcentaje: CODIGO_RETENCION_ENUM;
    tarifa: string;
    valor: string;
}
interface InfoTributaria {
    ambiente: number;
    tipoEmision: string;
    razonSocial: string;
    nombreComercial: string;
    ruc: string;
    claveAcceso: string;
    codDoc: string;
    estab: string;
    ptoEmi: string;
    secuencial: string;
    dirMatriz: string;
    contribuyenteRimpe?: string;
    agenteRetencion?: string;
}
interface InfoFactura {
    fechaEmision: string;
    dirEstablecimiento: string;
    contribuyenteEspecial?: string;
    obligadoContabilidad?: "SI" | "NO";
    comercioExterior?: string;
    incoTermFactura?: string;
    lugarIncoTerm?: string;
    paisOrigen?: string;
    puertoEmbarque?: string;
    puertoDestino?: string;
    paisDestino?: string;
    paisAdquisicion?: string;
    tipoIdentificacionComprador: string;
    guiaRemision?: string;
    razonSocialComprador: string;
    identificacionComprador: string;
    direccionComprador: string;
    totalSinImpuestos: string;
    incoTermTotalSinImpuestos?: string;
    totalDescuento: string;
    totalConImpuestos: {
        totalImpuesto: TotalImpuesto[];
    };
    propina: string;
    fleteInternacional?: number;
    seguroInternacional?: number;
    gastosAduaneros?: number;
    gastosTransporteOtros?: number;
    importeTotal: string;
    moneda: string;
    pagos: {
        pago: Pago[];
    };
    valorRetIva?: string;
    valorRetRenta?: string;
}
interface TotalImpuesto {
    codigo: TAX_CODE_ENUM;
    codigoPorcentaje: string;
    baseImponible: string;
    valor: string;
    descuentoAdicional?: string;
}
interface Detalles {
    detalle: Detalle[];
}
interface Pago {
    formaPago: string;
    total: string;
    plazo: number;
    unidadTiempo: string;
}
interface Detalle {
    codigoPrincipal: string;
    codigoAuxiliar: string;
    descripcion: string;
    cantidad: string;
    precioUnitario: string;
    descuento: string;
    precioTotalSinImpuesto: string;
    detallesAdicionales?: {
        detAdicional: DetAdicional[];
    };
    impuestos: {
        impuesto: ImpuestoDetalle[];
    };
}
interface DetAdicional {
    $: {
        nombre: string;
        valor: string;
    };
}
interface ImpuestoDetalle {
    codigo: TAX_CODE_ENUM;
    codigoPorcentaje: string;
    tarifa: string;
    baseImponible: string;
    valor: string;
}
interface InfoAdicional {
    campoAdicional: CampoAdicional[];
}
interface CampoAdicional {
    $: {
        nombre: string;
    };
    _: string;
}

interface ResponseGenerateXmlModel {
    invoiceJson: InvoiceSriBuilder;
    generatedXml: string;
}

type ComprobanteType = InstanceType<typeof ComprobanteModel>;

declare function generateXmlInvoice(invoice: ComprobanteType): Promise<ResponseGenerateXmlModel>;

declare const SRI_URLS: {
    readonly test: {
        readonly recepcion: "https://celcer.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline?wsdl";
        readonly autorizacion: "https://celcer.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline?wsdl";
    };
    readonly prod: {
        readonly recepcion: "https://cel.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline?wsdl";
        readonly autorizacion: "https://cel.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline?wsdl";
    };
};
type SRIEnv = keyof typeof SRI_URLS;

interface AuthorizeXmlCommand {
    claveAcceso: string;
    env: SRIEnv;
}

interface SriAuthorizationMessage {
    identificador: string;
    mensaje: string;
    tipo: string;
    informacionAdicional?: string;
}
interface SriAuthorizationResponse {
    claveAcceso: string;
    estadoAutorizacion: string;
    comprobante: string;
    rucEmisor: string;
    fechaAutorizacion: string;
    ambiente: string;
    comprobanteCrudo: string;
    mensajes: SriAuthorizationMessage[] | null;
}

interface ValidateXmlCommand {
    xml: Uint8Array;
    env: SRIEnv;
}

interface ValidateXmlResponse {
    estado: string;
    mensaje?: string;
}

declare function authorizeXml(data: AuthorizeXmlCommand): Promise<SriAuthorizationResponse>;

declare function validateXml(data: ValidateXmlCommand): Promise<ValidateXmlResponse>;

declare abstract class BaseSRIError extends Error {
    readonly estado: string;
    readonly identificador: string;
    readonly mensajeSRI: string;
    readonly informacionAdicional: string;
    readonly tipo: string;
    readonly claveAcceso: string;
    constructor(params: {
        estado: string;
        identificador: string;
        mensaje: string;
        informacionAdicional: string;
        tipo: string;
        claveAcceso: string;
        customMessage?: string;
    });
}
declare class SRIError extends Error {
    constructor(message: string);
}

declare class SRIAutorizacionError extends Error {
    readonly estado: string;
    readonly identificador: string;
    readonly mensajeSRI: string;
    readonly informacionAdicional: string;
    readonly tipo: string;
    readonly claveAcceso: string;
    readonly ambiente?: string;
    readonly comprobanteXml?: string;
    constructor(params: {
        estado: string;
        identificador: string;
        mensaje: string;
        informacionAdicional: string;
        tipo: string;
        claveAcceso: string;
        ambiente?: string;
        comprobanteXml?: string;
    });
}
declare class SRIUnauthorizedError extends SRIError {
    readonly estado: string;
    constructor(estado: string);
}

declare class SRIRejectedError extends BaseSRIError {
    constructor(params: {
        estado: string;
        identificador: string;
        mensaje: string;
        informacionAdicional: string;
        tipo: string;
        claveAcceso: string;
    });
}

export { type AuthorizeXmlCommand, BaseSRIError, CODIGO_RETENCION_ENUM, CONTRIBUYENTE_RIMPE_ENUM, type CampoAdicional, CampoAdicionalModel, CodigoPais, ComprobanteModel, type ComprobanteType, type DetAdicional, DetAdicionalModel, type Detalle, DetalleModel, type Detalles, DetallesAdicionalesModel, DetallesModel, ENV_ENUM, type FacturaInfo, IDENTIFICATION_CODE_ENUM, IMPUESTO_A_RETENER_ENUM, IVA_PERCENTAGE_CODE_ENUM, type ImpuestoDetalle, ImpuestoDetalleModel, ImpuestosModel, type InfoAdicional, InfoAdicionalModel, type InfoFactura, InfoFacturaModel, type InfoTributaria, InfoTributariaModel, type InvoiceSriBuilder, OBLIGADO_CONTABILIDAD_ENUM, PAYMENT_METHOD_CODE_ENUM, type Pago, PagoModel, PagosModel, type ParsedP12Certificate, type ResponseGenerateXmlModel, Retencion, RetencionModel, Retenciones, RetencionesModel, SRIAutorizacionError, type SRIEnv, SRIError, SRIRejectedError, SRIUnauthorizedError, SRI_URLS, type SignXmlRequest, type SignatureIdentifiersInterface, type SriAuthorizationMessage, type SriAuthorizationResponse, TAX_CODE_ENUM, TotalConImpuestosModel, type TotalImpuesto, TotalImpuestoModel, type ValidateXmlCommand, type ValidateXmlResponse, type XadesBesResultInterface, authorizeXml, generateXmlInvoice, signXml, validateXml };
