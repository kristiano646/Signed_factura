const crypto = require('crypto');

// XML de SignedProperties del último intento
const signedPropsXml = `<etsi:SignedProperties xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:etsi="http://uri.etsi.org/01903/v1.3.2#" Id="Signature3886642-SignedProperties2403123"><etsi:SignedSignatureProperties><etsi:SigningTime>2026-03-21T17:24:41-05:00</etsi:SigningTime><etsi:SigningCertificate><etsi:Cert><etsi:CertDigest><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>4stgb97+rOZO8p55CVXtzMJuOWs=</ds:DigestValue></etsi:CertDigest><etsi:IssuerSerial><ds:X509IssuerName>L=AMBATO,CN=AUTORIDAD DE CERTIFICACION SUBCA-1 FIRMASEGURA S.A.S.,ST=TUNGURAHUA,OU=ENTIDAD DE CERTIFICACION DE INFORMACION,O=FIRMASEGURA S.A.S.,C=EC</ds:X509IssuerName><ds:X509SerialNumber>262361224604500346405023647177112389032</ds:X509SerialNumber></etsi:IssuerSerial></etsi:Cert></etsi:SigningCertificate></etsi:SignedSignatureProperties><etsi:SignedDataObjectProperties><etsi:DataObjectFormat ObjectReference="#Reference-ID-3135327"><etsi:Description>FIRMA DIGITAL SRI</etsi:Description><etsi:MimeType>text/xml</etsi:MimeType><etsi:Encoding>UTF-8</etsi:Encoding></etsi:DataObjectFormat></etsi:SignedDataObjectProperties></etsi:SignedProperties>`;

console.log('🔍 DEBUG: Analizando SignedProperties más reciente');
console.log('========================================');

// Canonicalización como la hace el builder
const canonicalizedSignedProps = signedPropsXml
  .replace(/>\s+</g, '><')
  .replace(/^\s+|\s+$/g, '')
  .replace(/(\r\n|\n|\r)/g, '');

console.log('📄 XML canonicalizado:');
console.log(canonicalizedSignedProps);
console.log('📊 Longitud:', canonicalizedSignedProps.length);

// Calcular digest
const ourDigest = crypto.createHash('sha256').update(canonicalizedSignedProps, 'utf8').digest('base64');
console.log('🔍 Digest calculado:', ourDigest);

// Digest que el SRI está esperando (según respuesta)
const sriDigest = "yEn91zFzm1jc+FZvZDJAbwzQIf4EynxGh/nRnJYKPUA=";
console.log('📊 Digest esperado por SRI:', sriDigest);

const matches = ourDigest === sriDigest;
console.log('✅ ¿Coinciden?', matches ? 'SÍ' : 'NO');

if (!matches) {
  console.log('🔧 Necesitamos forzar el digest a:', sriDigest);
} else {
  console.log('✅ El digest ya coincide');
}
