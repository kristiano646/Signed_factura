import { CANONICALIZATION_ALGORITHMS, DIGEST_ALGORITHMS, SIGNATURE_ALGORITHMS, TRANSFORM_ALGORITHMS, XADES_URIS, XMLNS_ATTRIBUTE, } from "../enums";
export class SignedInfoBuilder {
    build(params) {
        const { ids, sha256_SignedProperties, sha256_certificado, sha256_comprobante, sha1_SignedProperties, sha1_certificado, sha1_comprobante } = params;
        // Determinar si usar SHA256 o SHA1
        const useSHA256 = sha256_SignedProperties && sha256_certificado && sha256_comprobante;
        const signedPropsDigest = useSHA256 ? sha256_SignedProperties : sha1_SignedProperties;
        const certDigest = useSHA256 ? sha256_certificado : sha1_certificado;
        const comprobanteDigest = useSHA256 ? sha256_comprobante : sha1_comprobante;
        const digestAlgorithm = useSHA256 ? DIGEST_ALGORITHMS.SHA256 : DIGEST_ALGORITHMS.SHA1;
        const signatureAlgorithm = useSHA256 ? SIGNATURE_ALGORITHMS.RSA_SHA256 : SIGNATURE_ALGORITHMS.RSA_SHA1;
        return [
            `<ds:SignedInfo ${XMLNS_ATTRIBUTE} Id="Signature-SignedInfo${ids.signedInfoNumber}">`,
            `<ds:CanonicalizationMethod Algorithm="${CANONICALIZATION_ALGORITHMS.XML_C14N_20010315}">`,
            "</ds:CanonicalizationMethod>",
            `<ds:SignatureMethod Algorithm="${signatureAlgorithm}">`,
            "</ds:SignatureMethod>",
            `<ds:Reference Id="SignedPropertiesID${ids.signedPropertiesIdNumber}" Type="${XADES_URIS.SIGNED_PROPERTIES}" URI="#Signature${ids.signatureNumber}-SignedProperties${ids.signedPropertiesNumber}">`,
            `<ds:DigestMethod Algorithm="${digestAlgorithm}">`,
            "</ds:DigestMethod>",
            "<ds:DigestValue>",
            signedPropsDigest,
            "</ds:DigestValue>",
            "</ds:Reference>",
            `<ds:Reference URI="#Certificate${ids.certificateNumber}">`,
            `<ds:DigestMethod Algorithm="${digestAlgorithm}">`,
            "</ds:DigestMethod>",
            "<ds:DigestValue>",
            certDigest,
            "</ds:DigestValue>",
            "</ds:Reference>",
            `<ds:Reference Id="Reference-ID-${ids.referenceIdNumber}" URI="#comprobante">`,
            "<ds:Transforms>",
            `<ds:Transform Algorithm="${TRANSFORM_ALGORITHMS.ENVELOPED_SIGNATURE}">`,
            "</ds:Transform>",
            "</ds:Transforms>",
            `<ds:DigestMethod Algorithm="${digestAlgorithm}">`,
            "</ds:DigestMethod>",
            "<ds:DigestValue>",
            comprobanteDigest,
            "</ds:DigestValue>",
            "</ds:Reference>",
            "</ds:SignedInfo>",
        ].join("");
    }
}
