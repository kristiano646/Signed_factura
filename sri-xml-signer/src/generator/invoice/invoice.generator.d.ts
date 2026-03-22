import { ResponseGenerateXmlModel } from "./models";
import { ComprobanteType } from "./types/comprobante.type";
export declare function generateXmlInvoice(invoice: ComprobanteType): Promise<ResponseGenerateXmlModel>;
