import { ClockPort } from "../ports";
export declare class SignedPropertiesBuilder {
    private readonly clock;
    constructor(clock: ClockPort);
    build(params: {
        signatureNumber: string;
        signedPropertiesNumber: string;
        certificateX509_der_hash: string;
        issuerName: string;
        X509SerialNumber: string;
        referenceIdNumber: string;
        useSHA256?: boolean;
    }): string;
}
