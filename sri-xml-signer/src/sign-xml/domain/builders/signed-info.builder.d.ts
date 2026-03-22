import { SignatureIdentifiersInterface } from "../interfaces";
export declare class SignedInfoBuilder {
    build(params: {
        ids: SignatureIdentifiersInterface;
        sha256_SignedProperties?: string;
        sha256_certificado?: string;
        sha256_comprobante?: string;
        sha1_SignedProperties?: string;
        sha1_certificado?: string;
        sha1_comprobante?: string;
    }): string;
}
