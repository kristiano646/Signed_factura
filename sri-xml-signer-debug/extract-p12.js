// Script para extraer clave privada y certificado de un .p12 en Node.js
// Requiere: npm install node-forge

const fs = require('fs');
const forge = require('node-forge');

const p12Path = 'D:/proyectos/apk_inventarios/backend/src/FacturacionElectronica.API/certificates/4.p12';
const password = 'Christian2025';

try {
  const p12Buffer = fs.readFileSync(p12Path);
  const p12Der = forge.util.createBuffer(p12Buffer.toString('binary'));
  const p12Asn1 = forge.asn1.fromDer(p12Der);
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, password);

  // Extraer clave privada
  let privateKey = null;
  let certificate = null;
  p12.safeContents.forEach(safeContents => {
    safeContents.safeBags.forEach(safeBag => {
      if (safeBag.type === forge.pki.oids.pkcs8ShroudedKeyBag) {
        privateKey = safeBag.key;
      }
      if (safeBag.type === forge.pki.oids.certBag) {
        certificate = safeBag.cert;
      }
    });
  });

  if (privateKey && certificate) {
    console.log('✅ Clave privada y certificado extraídos correctamente');
    console.log('Certificado PEM:\n', forge.pki.certificateToPem(certificate));
    console.log('Clave privada PEM:\n', forge.pki.privateKeyToPem(privateKey));
  } else {
    console.error('❌ No se pudo extraer la clave privada o el certificado');
  }
} catch (err) {
  console.error('❌ Error extrayendo datos del .p12:', err);
}