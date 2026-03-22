import { DOMParser, XMLSerializer } from "@xmldom/xmldom";
export class XmlSignatureInjector {
    constructor(context) {
        this.context = context;
    }
    insertSignature(signatureXml) {
        const parser = new DOMParser();
        const serializer = new XMLSerializer();
        const doc = this.context.getDocument();
        const signatureNode = parser.parseFromString(signatureXml, "application/xml").documentElement;
        const imported = doc.importNode(signatureNode, true);
        doc.documentElement.appendChild(imported);
        return serializer.serializeToString(doc);
    }
}
