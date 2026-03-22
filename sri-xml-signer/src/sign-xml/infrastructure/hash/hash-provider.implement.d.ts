import { HashProviderPort } from "../../domain/ports";
export declare class HashProviderImplement implements HashProviderPort {
    sha1Base64(input: string): string;
    sha256Base64(input: string): string;
    sha1RawBase64(input: Uint8Array): string;
    sha256RawBase64(input: Uint8Array): string;
}
