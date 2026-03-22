import type { Document as DocumentDom, Element as ElementDom } from "@xmldom/xmldom";
export declare class XmlDomContext {
    private readonly dom;
    constructor(xmlString: string);
    getDocument(): DocumentDom;
    getRootNode(): ElementDom;
}
