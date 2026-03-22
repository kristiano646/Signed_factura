import { DIGEST_ALGORITHMS, XMLNS_ATTRIBUTE } from "../enums";
import { ClockPort } from "../ports";

export class SignedPropertiesBuilder {
  constructor(private readonly clock: ClockPort) {}

  build(params: {
    signatureNumber: string;
    signedPropertiesNumber: string;
    certificateX509_der_hash: string;
    issuerName: string;
    X509SerialNumber: string;
    referenceIdNumber: string;
    useSHA256?: boolean;
  }): string {
    const {
      signatureNumber,
      signedPropertiesNumber,
      certificateX509_der_hash,
      issuerName,
      X509SerialNumber,
      referenceIdNumber,
      useSHA256 = true, // Por defecto usar SHA256
    } = params;

    const timestamp = this.clock.nowISO();
    const digestAlgorithm = useSHA256 ? DIGEST_ALGORITHMS.SHA256 : DIGEST_ALGORITHMS.SHA1;

    const signedProperties = [
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

    // 🔍 DEBUG: Calcular digest de SignedProperties
    const crypto = require('crypto');
    
    console.log("📄 SignedProperties original (primeros 200 chars):", signedProperties.substring(0, 200));
    
    const canonicalizedSignedProps = signedProperties
      .replace(/>\s+</g, '><')
      .replace(/^\s+|\s+$/g, '')
      .replace(/(\r\n|\n|\r)/g, '');

    console.log("📄 SignedProperties canonicalizado (primeros 200 chars):", canonicalizedSignedProps.substring(0, 200));
    console.log("📊 Longitud canonicalizado:", canonicalizedSignedProps.length);

    const ourDigest = crypto.createHash('sha256').update(canonicalizedSignedProps, 'utf8').digest('base64');
    console.log("🔍 Digest calculado para SignedProperties:", ourDigest);
    
    // Buscar el digest en el XML original para comparar
    const digestMatch = signedProperties.match(/<ds:DigestValue>([^<]+)<\/ds:DigestValue>/);
    if (digestMatch) {
      console.log("📊 Digest encontrado en XML:", digestMatch[1]);
      console.log("✅ ¿Coinciden?", ourDigest === digestMatch[1] ? "SÍ" : "NO");
    }
    
    // ✅ Digest calculado correctamente - Sin forzado
    console.log("✅ Digest SignedProperties generado:", ourDigest);
    return signedProperties;
  }
}
