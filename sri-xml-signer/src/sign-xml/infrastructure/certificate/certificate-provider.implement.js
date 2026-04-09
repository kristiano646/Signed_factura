import { getForge } from "../../../utils/forge-loader";
export class CertificateProviderImplement {
    constructor(p12Buffer, password, strategyFactory, crypto) {
        this.p12Buffer = p12Buffer;
        this.password = password;
        this.strategyFactory = strategyFactory;
        this.crypto = crypto;
    }
    async getCertificateData() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const forge = await getForge();
        const uint8Array = new Uint8Array(this.p12Buffer);
        const p12Base64 = forge.util.binary.base64.encode(uint8Array);
        const p12Decoded = forge.util.decode64(p12Base64);
        const p12Asn1 = forge.asn1.fromDer(p12Decoded);
        const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, this.password);
        const keyBags = p12.getBags({
            bagType: forge.pki.oids.pkcs8ShroudedKeyBag,
        });
        const certBags = p12.getBags({ bagType: forge.pki.oids.certBag });
        const certificates = certBags[forge.oids.certBag];
        const friendlyName = (_d = (_c = (_b = (_a = certificates === null || certificates === void 0 ? void 0 : certificates[1]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendlyName) === null || _c === void 0 ? void 0 : _c[0]) !== null && _d !== void 0 ? _d : (_j = (_h = (_g = (_f = (_e = certificates === null || certificates === void 0 ? void 0 : certificates[0]) === null || _e === void 0 ? void 0 : _e.cert) === null || _f === void 0 ? void 0 : _f.issuer) === null || _g === void 0 ? void 0 : _g.attributes) === null || _h === void 0 ? void 0 : _h[2]) === null || _j === void 0 ? void 0 : _j.value;
        const strategy = this.strategyFactory.getStrategy(friendlyName);
        const privateKey = await strategy.getPrivateKey(keyBags[forge.oids.pkcs8ShroudedKeyBag]);
        const issuerName = await strategy.overrideIssuerName(certBags);
        const mainCertificate = certificates.reduce((prev, current) => {
            return current.cert.extensions.length > prev.cert.extensions.length
                ? current
                : prev;
        });
        const certificate = mainCertificate.cert;
        const certificateX509_asn1 = forge.pki.certificateToAsn1(certificate);
        const certificateX509_der = forge.asn1.toDer(certificateX509_asn1);
        const certificateX509_der_hash = forge.util.encode64(forge.sha256.create().update(certificateX509_der.bytes()).digest().bytes());
        const X509SerialNumber = new forge.jsbn.BigInteger(Array.from(Buffer.from(certificate.serialNumber, "hex"))).toString();
        const certificateX509 = forge.util.encode64(certificateX509_der.bytes());
        const exponent = await this.crypto.hexToBase64(privateKey.e.data[0].toString(16));
        const modulus = await this.crypto.bigint3base64(privateKey.n);
        return {
            certificate,
            certificateX509,
            privateKey,
            issuerName,
            serialNumber: X509SerialNumber,
            base64Der: certificateX509_der_hash,
            publicKey: {
                modulus,
                exponent,
            },
        };
    }
}
