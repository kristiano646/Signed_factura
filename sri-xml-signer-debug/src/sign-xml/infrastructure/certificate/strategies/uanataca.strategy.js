import { getForge } from "../../../../utils/forge-loader";
import { PrivateKeyExtractionError, SigningKeyNotFoundError, UanatacaCertificateNotFoundError, } from "../../errors";
export class UanatacaStrategy {
    supports(friendlyName) {
        return /UANATACA/i.test(friendlyName);
    }
    async getPrivateKey(bags) {
        const forge = await getForge();
        const item = bags[0];
        if (!item)
            throw new SigningKeyNotFoundError("UANATACA");
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
        const certItems = certBags[forge.pki.oids.certBag];
        if (!certItems || !certItems.length) {
            throw new UanatacaCertificateNotFoundError();
        }
        const cert = certItems[0].cert;
        return await this.getX509IssuerName(cert);
    }
    async getX509IssuerName(cert) {
        const forge = await getForge();
        const issuerName = cert.issuer.attributes
            .reverse()
            .filter((attr) => attr.shortName || attr.type)
            .map((attr) => {
            if (attr.shortName) {
                return `${attr.shortName}=${attr.value}`;
            }
            else {
                return `${attr.type}=${this.hexEncodeUtf8(attr.value, forge)}`;
            }
        })
            .join(",");
        return issuerName;
    }
    hexEncodeUtf8(value, forge) {
        const utf8Bytes = forge.util.encodeUtf8(value);
        const hex = forge.util.bytesToHex(utf8Bytes);
        return `#0c${utf8Bytes.length.toString(16).padStart(2, "0")}${hex}`;
    }
}
