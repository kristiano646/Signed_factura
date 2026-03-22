const crypto = require('crypto');

// Extraer SignedInfo del XML firmado para análisis
const signedInfoXML = `<ds:SignedInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:etsi="http://uri.etsi.org/01903/v1.3.2#" Id="Signature-SignedInfo4249617"><ds:CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments"/><ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><ds:Reference Id="SignedPropertiesID3984983" Type="http://uri.etsi.org/01903#SignedProperties" URI="#Signature2242249-SignedProperties3433089"><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>X3MGojW0opWss2Mhdw1qJV9Mr1LxqaoAOWiB8Kzes6w=</ds:DigestValue></ds:Reference><ds:Reference Id="Reference-ID-9742275" URI="#comprobante"><ds:Transforms><ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/></ds:Transforms><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>ajB2Zhw4KYZxHK/sO1W5tlpan8O0RNdJwkOMyNuo4Hg=</ds:DigestValue></ds:Reference></ds:SignedInfo>`;

console.log('🔍 ANÁLISIS DE FIRMA DIGITAL');
console.log('============================');

// Canonicalizar SignedInfo (similar al proceso SRI)
let canonicalizedSignedInfo = signedInfoXML
    .replace(/>\s+</g, '><')
    .replace(/^\s+|\s+$/g, '')
    .replace(/(\r\n|\n|\r)/g, '');

console.log('📊 SignedInfo Canonicalizado:');
console.log(canonicalizedSignedInfo);
console.log('\n📏 Longitud:', canonicalizedSignedInfo.length);

// La firma que se generó
const signatureValue = 'YXRjc3EJKNM82YhklW/4uplgxC79vPwIxGdmLYZ2O8rNOTud5OEZs4Ubclil9piIHzrkHy/9O4zWIsU4wPiiViXeQIieo64kXlLNlv0FzjNt3njQJmGH/xXRe7mQcDS555XO1vF3B/wTx10b+hMdksXbbpRoJ8KNqDNaTvrpW2uBPzCT0j3B+PnYrKfiziJzHkTjT/LW+bx6qWKnk122yUvF+VLhIzY5rE9++6gN7qs09b6OSgqfLR3tWh8il/SP5tYn5vkOpXFpYfYSeN8D56QFXk6BHPNoG8NBojQUW+WuO0Eqzikflz88P2BSrYl/0q6f8COt9QYjhNAnIjWTUQ==';

console.log('\n📝 Firma generada (base64):');
console.log(signatureValue);

console.log('\n🔍 Análisis:');
console.log('• Los digests son correctos ✅');
console.log('• El problema debe estar en la firma RSA-SHA256');
console.log('• O en la canonicalización del SignedInfo');
console.log('• O en el orden/espaciado de los elementos');

console.log('\n💡 Próximos pasos:');
console.log('1. Verificar si el SignedInfo está en el orden correcto');
console.log('2. Probar diferentes canonicalizaciones del SignedInfo');
console.log('3. Verificar la firma RSA con diferentes herramientas');

// Guardar para análisis posterior
require('fs').writeFileSync('signed_info_canonical.xml', canonicalizedSignedInfo);
console.log('\n💾 SignedInfo guardado en: signed_info_canonical.xml');
