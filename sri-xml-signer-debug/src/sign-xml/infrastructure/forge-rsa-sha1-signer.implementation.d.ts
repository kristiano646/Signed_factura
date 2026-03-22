import * as forge from "node-forge";
import { SignerPort } from "../domain/ports";
export declare class ForgeRsaSha1Signer implements SignerPort {
    private readonly privateKey;
    constructor(privateKey: forge.pki.rsa.PrivateKey);
    signSha1RsaBase64(input: string): string;
    signSha256RsaBase64(input: string): string;
}
