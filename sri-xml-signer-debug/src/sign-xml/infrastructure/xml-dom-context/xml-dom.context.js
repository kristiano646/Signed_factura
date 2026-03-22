import { DOMParser } from "@xmldom/xmldom";
import { InvalidXmlStructureError } from "../errors";
export class XmlDomContext {
    constructor(xmlString) {
        try {
            const dom = new DOMParser({
                errorHandler: () => { },
            }).parseFromString(xmlString, "text/xml");
            this.dom = dom;
        }
        catch (err) {
            throw new InvalidXmlStructureError();
        }
    }
    getDocument() {
        return this.dom;
    }
    getRootNode() {
        return this.dom.documentElement;
    }
}
