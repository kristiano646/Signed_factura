import {
  ClockPort,
  CanonicalizerPort,
  SignatureIdGeneratorPort,
  SignerPort,
  HashProviderPort,
} from "./ports";
import { SignatureData } from "./signature-data";

import {
  SignedPropertiesBuilder,
  KeyInfoBuilder,
  SignedInfoBuilder,
} from "./builders";
import { XadesDocumentAssembler } from "./assemblers";

import { utf8Encode } from "../../utils";
import { XadesBesResultInterface } from "./interfaces";
import { DOMParser } from "@xmldom/xmldom";

const { C14nCanonicalization } = require("xml-crypto/lib/c14n-canonicalization");

export class XadesSignatureService {
  constructor(
    private readonly clock: ClockPort,
    private readonly canonicalizer: CanonicalizerPort,
    private readonly hasher: HashProviderPort,
    private readonly idGenerator: SignatureIdGeneratorPort,
    private readonly signer: SignerPort
  ) {}

  async sign(data: SignatureData): Promise<XadesBesResultInterface> {
    const ids = this.idGenerator.generateAll();
    const { certData, xmlToSign } = data;
    const { issuerName } = certData;

    // LIMPIAR XML ANTES DE CANONICALIZAR - Eliminar todos los espacios y saltos de línea
                            // Eliminar espacios residuales

    // CALCULAR DIGEST DEL COMPROBANTE ANTES DE AGREGAR FIRMA
    const canonicalizedXml = this.canonicalizeForReferenceDigest(xmlToSign);
    let digestXml = this.hasher.sha256Base64(utf8Encode(canonicalizedXml));

    // 🔍 DEBUG: Mostrar digest calculado
    console.log("🔍 Digest calculado para comprobante:", digestXml);
    
    const certDigest = certData.base64Der;

    const serialNumber = certData.serialNumber;
    const certificateX509 = certData.certificateX509;
    const modulus = certData.publicKey.modulus;
    const exponent = certData.publicKey.exponent;

    const signedPropsBuilder = new SignedPropertiesBuilder(this.clock);
    const SignedProperties = signedPropsBuilder.build({
      signatureNumber: ids.signatureNumber,
      signedPropertiesNumber: ids.signedPropertiesNumber,
      certificateX509_der_hash: certDigest,
      issuerName: issuerName,
      X509SerialNumber: serialNumber,
      referenceIdNumber: ids.referenceIdNumber,
      useSHA256: true, // Usar SHA256 para SRI Ecuador
    });
const canonicalSignedProps = this.canonicalizeForReferenceDigest(SignedProperties);
const sha256_SignedProperties = this.hasher.sha256Base64(utf8Encode(canonicalSignedProps));
    console.log("📄 SignedProperties original (primeros 200 chars):", SignedProperties.substring(0, 200));
    
    // Canonicalizar SignedProperties como lo hace el SRI
   console.log("🔍 Digest calculado para SignedProperties:", sha256_SignedProperties);
    if (sha256_SignedProperties === digestXml) {
      throw new Error("Digest duplicado detectado: SignedProperties y comprobante no pueden tener el mismo valor");
    }
    const KeyInfo = new KeyInfoBuilder().build({
      certificateNumber: ids.certificateNumber.toString(),
      certificateX509,
      modulus,
      exponent,
    });

 const SignedInfo = new SignedInfoBuilder().build({
      ids,
      sha256_SignedProperties,
      sha256_comprobante: digestXml,
    });

    // 🚨 IMPORTANTE: Canonicalizar el SignedInfo antes de firmar (XML-C14N con comentarios)
    // NOTA: Implementación manual de XML-C14N con comentarios para SRI
  
    console.log("🔍 SignedInfo canonicalizado para firma:", SignedInfo);
    console.log("🔍 Longitud SignedInfo canonicalizado:", SignedInfo.length);
    
   const canonicalSignedInfo = await this.canonicalizer.canonicalize(SignedInfo);

const signatureValue = this.signer.signSha256RsaBase64(
  utf8Encode(canonicalSignedInfo)
);
    const xadesBes = new XadesDocumentAssembler().build({
      ids,
      SignedInfo,
      signature: signatureValue,
      KeyInfo,
      SignedProperties,
    });

    // LIMPIEZA FINAL: Eliminar saltos de línea del XML firmado
    console.log("🧼 ANTES DE LIMPIEZA FINAL - Longitud:", xadesBes.length);
    console.log("🧼 ANTES DE LIMPIEZA FINAL - Contiene saltos de línea:", xadesBes.includes('\n'));
    return {
      xadesBes
    };
  }

  private canonicalizeForReferenceDigest(xmlFragment: string): string {
    const doc = new DOMParser().parseFromString(xmlFragment, "text/xml");
    const root = doc.documentElement;
    const c14n = new C14nCanonicalization();

    // XMLDSig usa C14N 1.0 para transformar node-set a octet stream en referencias.
    return c14n.process(root, {});
  }
  /**
   * Canonicalización manual XML-C14N con comentarios para SRI
   * Implementación simplificada de canonicalización XML 1.0
   */

  
}
