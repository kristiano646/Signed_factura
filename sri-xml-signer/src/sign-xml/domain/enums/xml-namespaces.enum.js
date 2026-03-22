// domain/signature/XMLNamespaces.ts
export var XML_NAMESPACES_ENUM;
(function (XML_NAMESPACES_ENUM) {
    XML_NAMESPACES_ENUM["DS"] = "http://www.w3.org/2000/09/xmldsig#";
    XML_NAMESPACES_ENUM["ETSI"] = "http://uri.etsi.org/01903/v1.3.2#";
})(XML_NAMESPACES_ENUM || (XML_NAMESPACES_ENUM = {}));
export const XMLNS_ATTRIBUTE = `xmlns:ds="${XML_NAMESPACES_ENUM.DS}" xmlns:etsi="${XML_NAMESPACES_ENUM.ETSI}"`;
export var DIGEST_ALGORITHMS;
(function (DIGEST_ALGORITHMS) {
    DIGEST_ALGORITHMS["SHA1"] = "http://www.w3.org/2000/09/xmldsig#sha1";
    DIGEST_ALGORITHMS["SHA256"] = "http://www.w3.org/2001/04/xmlenc#sha256";
})(DIGEST_ALGORITHMS || (DIGEST_ALGORITHMS = {}));
// domain/signature/SignatureAlgorithms.ts
export var SIGNATURE_ALGORITHMS;
(function (SIGNATURE_ALGORITHMS) {
    SIGNATURE_ALGORITHMS["RSA_SHA1"] = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
    SIGNATURE_ALGORITHMS["RSA_SHA256"] = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
})(SIGNATURE_ALGORITHMS || (SIGNATURE_ALGORITHMS = {}));
// domain/signature/TransformAlgorithms.ts
export var TRANSFORM_ALGORITHMS;
(function (TRANSFORM_ALGORITHMS) {
    TRANSFORM_ALGORITHMS["ENVELOPED_SIGNATURE"] = "http://www.w3.org/2000/09/xmldsig#enveloped-signature";
})(TRANSFORM_ALGORITHMS || (TRANSFORM_ALGORITHMS = {}));
// enums/CanonicalizationAlgorithms.ts
export var CANONICALIZATION_ALGORITHMS;
(function (CANONICALIZATION_ALGORITHMS) {
    CANONICALIZATION_ALGORITHMS["XML_C14N_20010315"] = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
})(CANONICALIZATION_ALGORITHMS || (CANONICALIZATION_ALGORITHMS = {}));
// enums/XadesURIs.ts
export var XADES_URIS;
(function (XADES_URIS) {
    XADES_URIS["SIGNED_PROPERTIES"] = "http://uri.etsi.org/01903#SignedProperties";
})(XADES_URIS || (XADES_URIS = {}));
