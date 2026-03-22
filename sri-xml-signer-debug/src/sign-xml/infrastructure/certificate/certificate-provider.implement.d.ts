import { CertificateProviderPort } from "../../domain/ports";
import { ParsedP12Certificate } from "../../domain/interfaces/parsed-p12-certificate.interface";
import { SignStrategyFactory } from "./factories";
import { CryptoUtils } from "../../common/utils";
export declare class CertificateProviderImplement implements CertificateProviderPort {
    private readonly p12Buffer;
    private readonly password;
    private readonly strategyFactory;
    private readonly crypto;
    constructor(p12Buffer: Uint8Array, password: string, strategyFactory: SignStrategyFactory, crypto: CryptoUtils);
    getCertificateData(): Promise<ParsedP12Certificate>;
}
