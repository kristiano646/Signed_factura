export interface SignerPort {
    signSha1RsaBase64(input: string): string;
    signSha256RsaBase64(input: string): string;
}
