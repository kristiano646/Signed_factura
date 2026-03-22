import * as soap from "soap";
export declare function createSoapClient(wsdlUrl: string): Promise<soap.Client>;
export declare function extractAutorizacionXml(rawResponse: string): string;
