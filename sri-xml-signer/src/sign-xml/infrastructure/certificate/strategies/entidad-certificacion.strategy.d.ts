import { SignStrategy } from "../../interfaces";
export declare class EntidadCertificacionStrategy implements SignStrategy {
    supports(friendlyName: string): boolean;
    getPrivateKey(bags: any[]): Promise<any>;
    overrideIssuerName(certBags: any): Promise<string>;
    private getX509IssuerName;
    private hexEncodeUtf8;
}
