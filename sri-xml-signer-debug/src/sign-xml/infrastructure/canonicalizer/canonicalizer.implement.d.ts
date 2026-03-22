import { CanonicalizerPort } from "../../domain/ports";
import { XmlDomContext } from "../xml-dom-context/xml-dom.context";
export declare class CanonicalizerImplement implements CanonicalizerPort {
    private readonly context;
    constructor(context: XmlDomContext);
    canonicalize(): Promise<string>;
}
