import { XmlDomContext } from "./xml-dom-context/xml-dom.context";
export declare class XmlSignatureInjector {
    private readonly context;
    constructor(context: XmlDomContext);
    insertSignature(signatureXml: string): string;
}
