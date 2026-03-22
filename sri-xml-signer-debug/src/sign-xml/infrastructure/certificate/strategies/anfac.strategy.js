import { getForge } from "../../../../utils/forge-loader";
import { PrivateKeyExtractionError, SigningKeyNotFoundError, } from "../../errors";
const OID_TO_RFC4514 = {
    "2.5.4.6": "C",
    "2.5.4.10": "O",
    "2.5.4.11": "OU",
    "2.5.4.3": "CN",
    "2.5.4.7": "L",
    "2.5.4.8": "ST",
    "2.5.4.9": "STREET",
    "2.5.4.5": "SERIALNUMBER",
    "1.2.840.113549.1.9.1": "E", // emailAddress
};
function escapeRfc4514(value) {
    // escapa caracteres especiales
    let v = value
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/,/g, "\\,")
        .replace(/\+/g, "\\+")
        .replace(/;/g, "\\;")
        .replace(/</g, "\\<")
        .replace(/>/g, "\\>")
        .replace(/#/g, "\\#")
        .replace(/=/g, "\\=");
    // espacio inicial o final deben escaparse
    if (v.startsWith(" "))
        v = "\\" + v;
    if (v.endsWith(" "))
        v = v.slice(0, -1) + "\\ ";
    return v;
}
function attrName(a) {
    // prioriza nombre RFC4514 por OID; si no, usa shortName, luego name y al final el OID literal
    return (OID_TO_RFC4514[a.type] ||
        (a.shortName ? a.shortName.toUpperCase() : "") ||
        (a.name ? a.name.toUpperCase() : "") ||
        a.type);
}
export class AnfacStrategy {
    supports(friendlyName) {
        return /ANFAC/i.test(friendlyName);
    }
    async getPrivateKey(bags) {
        const forge = await getForge();
        const item = bags[0];
        if (!item)
            throw new SigningKeyNotFoundError("ANFAC");
        if (item === null || item === void 0 ? void 0 : item.key)
            return item.key;
        if (item === null || item === void 0 ? void 0 : item.asn1)
            return forge.pki.privateKeyFromAsn1(item.asn1);
        throw new PrivateKeyExtractionError();
    }
    async overrideIssuerName(certBags) {
        const forge = await getForge();
        const cert = certBags[forge.pki.oids.certBag][0]
            .cert;
        // RFC4514: se listan los RDN del más específico al menos específico -> invertimos
        return cert.issuer.attributes
            .slice() // no mutar el original
            .reverse()
            .map((a) => `${attrName(a)}=${escapeRfc4514(String(a.value))}`)
            .join(",");
    }
}
