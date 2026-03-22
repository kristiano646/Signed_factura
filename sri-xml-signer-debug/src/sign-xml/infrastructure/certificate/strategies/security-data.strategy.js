import { getForge } from "../../../../utils/forge-loader";
import { PrivateKeyExtractionError, SigningKeyNotFoundError, } from "../../errors";
export class SecurityDataStrategy {
    supports(friendlyName) {
        return /SECURITY DATA/i.test(friendlyName);
    }
    async getPrivateKey(bags) {
        const forge = await getForge();
        const item = bags[0];
        if (!item)
            throw new SigningKeyNotFoundError("SECURITY DATAL");
        if (item === null || item === void 0 ? void 0 : item.key) {
            return item.key;
        }
        else if (item === null || item === void 0 ? void 0 : item.asn1) {
            return forge.pki.privateKeyFromAsn1(item.asn1);
        }
        else {
            throw new PrivateKeyExtractionError();
        }
    }
    async overrideIssuerName(certBags) {
        const forge = await getForge();
        const cert = certBags[forge.pki.oids.certBag][0].cert;
        return cert.issuer.attributes
            .reverse()
            .map((attr) => `${attr.shortName}=${attr.value}`)
            .join(",");
    }
}
