import { DIGEST_ALGORITHMS, XMLNS_ATTRIBUTE } from "../enums";
export class SignedPropertiesBuilder {
    constructor(clock) {
        this.clock = clock;
    }
    build(params) {
        const { signatureNumber, signedPropertiesNumber, certificateX509_der_hash, issuerName, X509SerialNumber, referenceIdNumber, useSHA256 = true, // Por defecto usar SHA256
         } = params;
        const timestamp = this.clock.nowISO();
        const digestAlgorithm = useSHA256 ? DIGEST_ALGORITHMS.SHA256 : DIGEST_ALGORITHMS.SHA1;
        return [
            `<etsi:SignedProperties ${XMLNS_ATTRIBUTE} Id="Signature${signatureNumber}-SignedProperties${signedPropertiesNumber}">`,
            "<etsi:SignedSignatureProperties>",
            "<etsi:SigningTime>",
            timestamp,
            "</etsi:SigningTime>",
            "<etsi:SigningCertificate>",
            "<etsi:Cert>",
            "<etsi:CertDigest>",
            `<ds:DigestMethod Algorithm="${digestAlgorithm}">`,
            "</ds:DigestMethod>",
            "<ds:DigestValue>",
            certificateX509_der_hash,
            "</ds:DigestValue>",
            "</etsi:CertDigest>",
            "<etsi:IssuerSerial>",
            "<ds:X509IssuerName>",
            issuerName,
            "</ds:X509IssuerName>",
            "<ds:X509SerialNumber>",
            X509SerialNumber,
            "</ds:X509SerialNumber>",
            "</etsi:IssuerSerial>",
            "</etsi:Cert>",
            "</etsi:SigningCertificate>",
            "</etsi:SignedSignatureProperties>",
            "<etsi:SignedDataObjectProperties>",
            `<etsi:DataObjectFormat ObjectReference="#Reference-ID-${referenceIdNumber}">`,
            "<etsi:Description>FIRMA DIGITAL SRI</etsi:Description>",
            "<etsi:MimeType>text/xml</etsi:MimeType>",
            "<etsi:Encoding>UTF-8</etsi:Encoding>",
            "</etsi:DataObjectFormat>",
            "</etsi:SignedDataObjectProperties>",
            "</etsi:SignedProperties>",
        ].join("");
    }
}
