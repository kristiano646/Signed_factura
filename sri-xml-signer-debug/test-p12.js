// Script para probar apertura de .p12 y contraseña en Node.js
// Ejecuta: node test-p12.js

const fs = require('fs');
const signer = require('osodreamer-sri-xml-signer');

const p12Path = 'D:/proyectos/apk_inventarios/backend/src/FacturacionElectronica.API/certificates/4.p12';
const password = 'Christian2025';

try {
  const certBuffer = fs.readFileSync(p12Path);
  console.log('Certificado leído, tamaño:', certBuffer.length);
  signer.signXml({
    xml: '<root></root>', // XML dummy
    certificate: certBuffer,
    password,
    format: 'XAdES-BES',
  })
    .then(() => {
      console.log('✅ Certificado y contraseña válidos (se pudo firmar XML dummy)');
    })
    .catch((err) => {
      console.error('❌ Error al validar certificado o contraseña:', err);
    });
} catch (err) {
  console.error('❌ Error leyendo el archivo .p12:', err);
}