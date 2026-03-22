import { SignStrategy } from "../../interfaces";
export declare class AnfacStrategy implements SignStrategy {
    supports(friendlyName: string): boolean;
    getPrivateKey(bags: any[]): Promise<any>;
    overrideIssuerName(certBags: any): Promise<string>;
}
