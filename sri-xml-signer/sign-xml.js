// Script para firmar XML usando osodreamer-sri-xml-signer
// Uso: node sign-xml.js <xmlPath> <certPath> <certPassword> <outputPath>

const fs = require('fs');
const path = require('path');
const signer = require('osodreamer-sri-xml-signer');

async function main() {
  const [xmlPath, certPath, certPassword, outputPath] = process.argv.slice(2);
  if (!xmlPath || !certPath || !certPassword || !outputPath) {
    console.error('Uso: node sign-xml.js <xmlPath> <certPath> <certPassword> <outputPath>');
    process.exit(1);
  }

  try {
    const xmlContent = fs.readFileSync(xmlPath, 'utf8');
    const certBuffer = fs.readFileSync(certPath);
    const signedXml = await signer.signXml({
      xml: xmlContent,
      certificate: certBuffer,
      password: certPassword,
      format: 'XAdES-BES',
    });
    fs.writeFileSync(outputPath, signedXml);
    console.log('XML firmado correctamente:', outputPath);
  } catch (err) {
    console.error('Error al firmar XML:', err);
    process.exit(2);
  }
}

main();
