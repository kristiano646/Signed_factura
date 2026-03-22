const crypto = require('crypto');

// Función para calcular SHA256
function calculateSHA256(content) {
    return crypto.createHash('sha256').update(content, 'utf8').digest('base64');
}

// Extraer y analizar el SignedProperties del XML firmado
const signedPropertiesXML = `<etsi:SignedProperties xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:etsi="http://uri.etsi.org/01903/v1.3.2#" Id="Signature1224311-SignedProperties9110986"><etsi:SignedSignatureProperties><etsi:SigningTime>2026-03-21T16:02:24-05:00</etsi:SigningTime><etsi:SigningCertificate><etsi:Cert><etsi:CertDigest><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>4stgb97+rOZO8p55CVXtzMJuOWs=</ds:DigestValue></etsi:CertDigest><etsi:IssuerSerial><ds:X509IssuerName>L=AMBATO,CN=AUTORIDAD DE CERTIFICACION SUBCA-1 FIRMASEGURA S.A.S.,ST=TUNGURAHUA,OU=ENTIDAD DE CERTIFICACION DE INFORMACION,O=FIRMASEGURA S.A.S.,C=EC</ds:X509IssuerName><ds:X509SerialNumber>262361224604500346405023647177112389032</ds:X509SerialNumber></etsi:IssuerSerial></etsi:Cert></etsi:SigningCertificate></etsi:SignedSignatureProperties><etsi:SignedDataObjectProperties><etsi:DataObjectFormat ObjectReference="#Reference-ID-5738950"><etsi:Description>FIRMA DIGITAL SRI</etsi:Description><etsi:MimeType>text/xml</etsi:MimeType><etsi:Encoding>UTF-8</etsi:Encoding></etsi:DataObjectFormat></etsi:SignedDataObjectProperties></etsi:SignedProperties>`;

console.log('🔍 ANÁLISIS DE DIGEST DE SIGNEDPROPERTIES');
console.log('==========================================');

// Canonicalizar SignedProperties (similar al proceso SRI)
let canonicalizedSignedProps = signedPropertiesXML
    .replace(/>\s+</g, '><')
    .replace(/^\s+|\s+$/g, '')
    .replace(/(\r\n|\n|\r)/g, '');

const ourSignedPropsDigest = calculateSHA256(canonicalizedSignedProps);

console.log('📊 Nuestro Digest SignedProperties:', ourSignedPropsDigest);
console.log('📊 Digest en XML firmado:', 'Aeiz9uHNtRX4/fl0UqC9ArNLFz44OC2udSq+KqL3HzU=');
console.log('🆚 ¿Coinciden?', ourSignedPropsDigest === 'Aeiz9uHNtRX4/fl0UqC9ArNLFz44OC2udSq+KqL3HzU=' ? '✅ SÍ' : '❌ NO');

if (ourSignedPropsDigest !== 'Aeiz9uHNtRX4/fl0UqC9ArNLFz44OC2udSq+KqL3HzU=') {
    console.log('\n🚨 PROBLEMA: El digest de SignedProperties no coincide');
    console.log('🔍 Esto podría ser la causa del "FIRMA INVALIDA"');
    
    // Intentar diferentes canonicalizaciones
    console.log('\n🧪 Probando diferentes canonicalizaciones:');
    
    // Opción 1: Con espacios preservados
    const withSpaces = signedPropertiesXML.replace(/(\r\n|\n|\r)/g, '');
    const digestWithSpaces = calculateSHA256(withSpaces);
    console.log('1. Con espacios (solo eliminar saltos):', digestWithSpaces);
    
    // Opción 2: Con indentación
    const withIndent = signedPropertiesXML.replace(/></g, '>\n<');
    const digestWithIndent = calculateSHA256(withIndent);
    console.log('2. Con indentación:', digestWithIndent);
    
    console.log('3. ¿Coincide con alguno?', 
        digestWithSpaces === 'Aeiz9uHNtRX4/fl0UqC9ArNLFz44OC2udSq+KqL3HzU=' ? '✅ SÍ (espacios)' : '❌ NO');
} else {
    console.log('\n✅ El digest de SignedProperties coincide - el problema no está aquí');
}

console.log('\n📄 SignedProperties Canonicalizado:');
console.log(canonicalizedSignedProps.substring(0, 200) + '...');
