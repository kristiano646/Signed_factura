import {
  CANONICALIZATION_ALGORITHMS,
  DIGEST_ALGORITHMS,
  SIGNATURE_ALGORITHMS,
  TRANSFORM_ALGORITHMS,
  XADES_URIS,
  XMLNS_ATTRIBUTE,
} from "../enums";
import { SignatureIdentifiersInterface } from "../interfaces";

export class SignedInfoBuilder {
  build(params: {
    ids: SignatureIdentifiersInterface;
    sha256_SignedProperties?: string;
    sha256_comprobante?: string;
  }): string {
    const { 
      ids, 
      sha256_SignedProperties, 
      sha256_comprobante
    } = params;

    // ✅ SRI Ecuador SIEMPRE usa SHA256 - NO hay fallback a SHA1
    const signedInfo = [
      `<ds:SignedInfo ${XMLNS_ATTRIBUTE} Id="Signature-SignedInfo${ids.signedInfoNumber}">`,
      `<ds:CanonicalizationMethod Algorithm="${CANONICALIZATION_ALGORITHMS.XML_EXC_C14N_20010315}" />`,
      `<ds:SignatureMethod Algorithm="${SIGNATURE_ALGORITHMS.RSA_SHA256}" />`,
      // 🔄 Referencia a SignedProperties PRIMERO (orden que SRI espera)
      `<ds:Reference Id="SignedPropertiesID${ids.signedPropertiesIdNumber}" Type="${XADES_URIS.SIGNED_PROPERTIES}" URI="#Signature${ids.signatureNumber}-SignedProperties${ids.signedPropertiesNumber}">`,
      `<ds:DigestMethod Algorithm="${DIGEST_ALGORITHMS.SHA256}" />`,
      "<ds:DigestValue>",
      sha256_SignedProperties,
      "</ds:DigestValue>",
      "</ds:Reference>",
      // 🔄 Referencia al COMPROBANTE DESPUÉS
      `<ds:Reference Id="Reference-ID-${ids.referenceIdNumber}" URI="#comprobante">`,
      "<ds:Transforms>",
      `<ds:Transform Algorithm="${TRANSFORM_ALGORITHMS.ENVELOPED_SIGNATURE}" />`,
      "</ds:Transforms>",
      `<ds:DigestMethod Algorithm="${DIGEST_ALGORITHMS.SHA256}" />`,
      "<ds:DigestValue>",
      sha256_comprobante,
      "</ds:DigestValue>",
      "</ds:Reference>",
      "</ds:SignedInfo>",
    ].join("");

    return signedInfo;
  }
}
