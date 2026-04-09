import { XmlDomContext } from "../xml-dom-context/xml-dom.context";
const { ExclusiveCanonicalization } = require("xml-crypto/lib/exclusive-canonicalization");
export class CanonicalizerImplement {
    constructor(context) {
        this.context = context;
    }
    async canonicalize(xml) {
        const targetNode = xml
            ? new XmlDomContext(xml).getRootNode()
            : this.context.getRootNode();
        const canonicalizer = new ExclusiveCanonicalization();
        return canonicalizer.process(targetNode, {
            inclusiveNamespacesPrefixList: [],
        });
    }
}
