// Script para firmar XML usando clave privada y certificado extraídos del .p12
// Requiere: npm install xml-crypto node-forge

const fs = require('fs');
const { SignedXml } = require('xml-crypto');
const forge = require('node-forge');

const p12Path = 'D:/proyectos/apk_inventarios/backend/src/FacturacionElectronica.API/certificates/4.p12';
const password = 'Christian2025';
const xmlPath = './xml-dummy.xml'; // Cambia por tu XML real

// Extraer clave y certificado
const p12Buffer = fs.readFileSync(p12Path);
const p12Der = forge.util.createBuffer(p12Buffer.toString('binary'));
const p12Asn1 = forge.asn1.fromDer(p12Der);
const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, password);

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

if (!privateKey || !certificate) {
  console.error('❌ No se pudo extraer clave privada o certificado');
  process.exit(1);
}

const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
const certificatePem = forge.pki.certificateToPem(certificate);

// Leer XML
const xml = fs.readFileSync(xmlPath, 'utf8');

// Firmar XML
const sig = new SignedXml();
sig.addReference("//*[local-name(.)='factura']", ["http://www.w3.org/2000/09/xmldsig#enveloped-signature"]);
sig.signingKey = privateKeyPem;
sig.keyInfoProvider = {
  getKeyInfo: () => `<X509Data><X509Certificate>${certificatePem.replace(/-----BEGIN CERTIFICATE-----|-----END CERTIFICATE-----|\n/g, '')}</X509Certificate></X509Data>`
};
sig.computeSignature(xml);

const signedXml = sig.getSignedXml();
fs.writeFileSync('./xml-firmado.xml', signedXml);
console.log('✅ XML firmado guardado en xml-firmado.xml');