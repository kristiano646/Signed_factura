export declare enum XML_NAMESPACES_ENUM {
    DS = "http://www.w3.org/2000/09/xmldsig#",
    ETSI = "http://uri.etsi.org/01903/v1.3.2#"
}
export declare const XMLNS_ATTRIBUTE = "xmlns:ds=\"http://www.w3.org/2000/09/xmldsig#\" xmlns:etsi=\"http://uri.etsi.org/01903/v1.3.2#\"";
export declare enum DIGEST_ALGORITHMS {
    SHA1 = "http://www.w3.org/2000/09/xmldsig#sha1",
    SHA256 = "http://www.w3.org/2001/04/xmlenc#sha256"
}
export declare enum SIGNATURE_ALGORITHMS {
    RSA_SHA1 = "http://www.w3.org/2000/09/xmldsig#rsa-sha1",
    RSA_SHA256 = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"
}
export declare enum TRANSFORM_ALGORITHMS {
    ENVELOPED_SIGNATURE = "http://www.w3.org/2000/09/xmldsig#enveloped-signature"
}
export declare enum CANONICALIZATION_ALGORITHMS {
    XML_C14N_20010315 = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315"
}
export declare enum XADES_URIS {
    SIGNED_PROPERTIES = "http://uri.etsi.org/01903#SignedProperties"
}
