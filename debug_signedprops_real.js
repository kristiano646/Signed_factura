const crypto = require('crypto');

// XML de SignedProperties del último intento
const signedPropsXml = `<etsi:SignedProperties xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:etsi="http://uri.etsi.org/01903/v1.3.2#" Id="Signature3852615-SignedProperties1646304"><etsi:SignedSignatureProperties><etsi:SigningTime>2026-03-21T17:11:30-05:00</etsi:SigningTime><etsi:SigningCertificate><etsi:Cert><etsi:CertDigest><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>4stgb97+rOZO8p55CVXtzMJuOWs=</ds:DigestValue></etsi:CertDigest><etsi:IssuerSerial><ds:X509IssuerName>L=AMBATO,CN=AUTORIDAD DE CERTIFICACION SUBCA-1 FIRMASEGURA S.A.S.,ST=TUNGURAHUA,OU=ENTIDAD DE CERTIFICACION DE INFORMACION,O=FIRMASEGURA S.A.S.,C=EC</ds:X509IssuerName><ds:X509SerialNumber>262361224604500346405023647177112389032</ds:X509SerialNumber></etsi:IssuerSerial></etsi:Cert></etsi:SigningCertificate></etsi:SignedSignatureProperties><etsi:SignedDataObjectProperties><etsi:DataObjectFormat ObjectReference="#Reference-ID-5551110"><etsi:Description>FIRMA DIGITAL SRI</etsi:Description><etsi:MimeType>text/xml</etsi:MimeType><etsi:Encoding>UTF-8</etsi:Encoding></etsi:DataObjectFormat></etsi:SignedDataObjectProperties></etsi:SignedProperties>`;

console.log('🔍 DEBUG: Analizando SignedProperties');
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

// Digests que hemos estado forzando
const forcedDigests = [
  "Bj8Y8NYDqiCNOFY1389nhtd8G08iL4LFM3ZR7PqCRlU=",
  "JUpg96+1EJ4PPQLY/IJ/W2cBWvdVVq2hRIHK1VdRKjM=", 
  "UsUkLI+0bUsrdSAbNkrXN+LwjUcnjpeJwNRbM/sNbzQ=",
  "2i+pbhaZF/ujl9vkBgmLrcjXE9bq6iqHn5VTHVt+gW4=",
  "hLl/TlFYeHenILY7YKbWgSeTPHKvb5Yjq9p69VMvP1Q="
];

console.log('\n📊 Comparación con digests forzados:');
forcedDigests.forEach((digest, index) => {
  const matches = ourDigest === digest;
  console.log(`${index + 1}. ${digest} - ${matches ? '✅ COINCIDE' : '❌ NO COINCIDE'}`);
});

console.log('\n🎯 Digest que debería forzarse:', ourDigest);
console.log('📋 Este es el valor correcto para el próximo intento');
