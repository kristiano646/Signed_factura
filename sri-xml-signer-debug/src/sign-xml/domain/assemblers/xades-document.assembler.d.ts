import { SignatureIdentifiersInterface } from "../interfaces";
export declare class XadesDocumentAssembler {
    build(params: {
        ids: SignatureIdentifiersInterface;
        SignedInfo: string;
        signature: string;
        KeyInfo: string;
        SignedProperties: string;
    }): string;
}
