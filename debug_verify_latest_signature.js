const fs = require("fs");
const xpath = require("xpath");
const { DOMParser } = require("@xmldom/xmldom");
const { SignedXml } = require("xml-crypto");

const xmlPath = process.argv[2] || "C:/Users/USER/AppData/Local/Temp/xml_firmado_4_20260408_222851.xml";

if (!fs.existsSync(xmlPath)) {
  console.error("XML no encontrado:", xmlPath);
  process.exit(1);
}

const xml = fs.readFileSync(xmlPath, "utf8");
const doc = new DOMParser().parseFromString(xml, "text/xml");

const signatures = xpath.select("//*[local-name(.)='Signature']", doc);
console.log("Firmas encontradas:", signatures.length);
if (!signatures.length) {
  console.error("No hay nodo Signature");
  process.exit(1);
}

const certNode = xpath.select("//*[local-name(.)='X509Certificate']/text()", doc)[0];
if (!certNode) {
  console.error("No hay X509Certificate en el XML");
  process.exit(1);
}

const certBase64 = certNode.data.replace(/\s+/g, "");
const certPem = `-----BEGIN CERTIFICATE-----\n${certBase64.match(/.{1,64}/g).join("\n")}\n-----END CERTIFICATE-----`;

const sig = new SignedXml();
sig.keyInfoProvider = {
  getKey() {
    return certPem;
  },
};

sig.loadSignature(signatures[0]);
const ok = sig.checkSignature(xml);

console.log("Firma valida:", ok);
if (!ok) {
  console.log("Errores:", sig.validationErrors);
}

for (const ref of sig.references || []) {
  const calc = sig.getCanonReferenceXml(ref, doc);
  console.log("Ref:", ref.uri, "DigestDeclarado:", ref.digestValue, "DigestCalc:", sig.findHashAlgorithm(ref.digestAlgorithm).getHash(calc));
}
