import { CanonicalizerPort } from "../../domain/ports";
import { XmlDomContext } from "../xml-dom-context/xml-dom.context";
// xml-crypto provee una canonicalizacion XMLDSig madura y compatible.
const {
  ExclusiveCanonicalization,
} = require("xml-crypto/lib/exclusive-canonicalization");

export class CanonicalizerImplement implements CanonicalizerPort {
  constructor(private readonly context: XmlDomContext) {}
  async canonicalize(xml: string): Promise<string> {
    const targetNode = xml
      ? new XmlDomContext(xml).getRootNode()
      : this.context.getRootNode();

    const canonicalizer = new ExclusiveCanonicalization();
    return canonicalizer.process(targetNode as unknown as Node, {
      inclusiveNamespacesPrefixList: [],
    });
  }
}
