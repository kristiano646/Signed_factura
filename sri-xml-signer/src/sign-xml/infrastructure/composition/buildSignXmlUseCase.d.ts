import { SignXmlUseCase } from "../../application/use-cases";
import { XmlDomContext } from "../xml-dom-context/xml-dom.context";
import * as forge from "node-forge";
export declare function buildSignXmlUseCase(privateKey: forge.pki.rsa.PrivateKey, context: XmlDomContext): SignXmlUseCase;
