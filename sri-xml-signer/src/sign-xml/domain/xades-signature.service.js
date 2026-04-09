import { SignedPropertiesBuilder, KeyInfoBuilder, SignedInfoBuilder, } from "./builders";
import { XadesDocumentAssembler } from "./assemblers";
import { utf8Encode } from "../../utils";
export class XadesSignatureService {
    constructor(clock, canonicalizer, hasher, idGenerator, signer) {
        this.clock = clock;
        this.canonicalizer = canonicalizer;
        this.hasher = hasher;
        this.idGenerator = idGenerator;
        this.signer = signer;
    }
    async sign(data) {
        const ids = this.idGenerator.generateAll();
        const { certData, xmlToSign } = data;
        const { issuerName } = certData;
        // LIMPIAR XML ANTES DE CANONICALIZAR - Eliminar todos los espacios y saltos de línea
        // const cleanedXml = xmlToSign
        //     .replace(/>\s+</g, '><') // Eliminar espacios entre etiquetas
        //     .replace(/\s+/g, ' ') // Reemplazar múltiples espacios con uno solo
        //     .replace(/>\s+/g, '>') // Eliminar espacios después de >
        //     .replace(/\s+</g, '<') // Eliminar espacios antes de <
        //     .replace(/^\s+|\s+$/g, '') // Eliminar espacios al inicio y final
        //     .replace(/(\r\n|\n|\r)/g, '') // Eliminar todos los saltos de línea
        //     .trim(); // Eliminar espacios residuales
        // CALCULAR DIGEST DEL COMPROBANTE ANTES DE AGREGAR FIRMA
        const canonicalizedXml = await this.canonicalizer.canonicalize(xmlToSign);
        const digestXml = this.hasher.sha256Base64(utf8Encode(canonicalizedXml));
        
        // 📊 DEBUG: Digest del comprobante
        console.log("🔍 === DIGEST DEL COMPROBANTE ===");
        console.log("📄 XML original (longitud):", xmlToSign.length);
        console.log("📄 XML canonicalizado (longitud):", canonicalizedXml.length);
        console.log("🔐 Digest calculado:", digestXml);
        console.log("🔐 Digest esperado: [Extraer del XML firmado]");
        console.log("🔍 ¿Coinciden?:", digestXml === "[Extraer del XML firmado]" ? "✅ SÍ" : "❌ NO");
        console.log("=========================================");
        const certDigest = certData.base64Der;
        const serialNumber = certData.serialNumber;
        const certificateX509 = certData.certificateX509;
        const modulus = certData.publicKey.modulus;
        const exponent = certData.publicKey.exponent;
        const canonicalSignedProps = await this.canonicalizer.canonicalize(SignedProperties);
        const sha256_SignedProperties = this.hasher.sha256Base64(utf8Encode(canonicalSignedProps));
        
        // 📊 DEBUG: Digest de SignedProperties
        console.log("🔍 === DIGEST DE SIGNEDPROPERTIES ===");
        console.log("📄 SignedProperties original (longitud):", SignedProperties.length);
        console.log("📄 SignedProperties canonicalizado (longitud):", canonicalSignedProps.length);
        console.log("🔐 Digest calculado:", sha256_SignedProperties);
        console.log("🔐 Digest esperado: [Extraer del XML firmado]");
        console.log("🔍 ¿Coinciden?:", sha256_SignedProperties === "[Extraer del XML firmado]" ? "✅ SÍ" : "❌ NO");
        console.log("==========================================");
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
        const KeyInfo = new KeyInfoBuilder().build({
            certificateNumber: ids.certificateNumber.toString(),
            certificateX509,
            modulus,
            exponent,
        });
        const sha256_certificado = this.hasher.sha256Base64(KeyInfo);
        
        // 📊 DEBUG: Digest del certificado (KeyInfo)
        console.log("🔍 === DIGEST DEL CERTIFICADO (KEYINFO) ===");
        console.log("📄 KeyInfo (longitud):", KeyInfo.length);
        console.log("🔐 Digest calculado:", sha256_certificado);
        console.log("🔐 Digest esperado: [Extraer del XML firmado]");
        console.log("🔍 ¿Coinciden?:", sha256_certificado === "[Extraer del XML firmado]" ? "✅ SÍ" : "❌ NO");
        console.log("=============================================");
        const SignedInfo = new SignedInfoBuilder().build({
            ids,
            sha256_SignedProperties,
            sha256_certificado,
            sha256_comprobante: digestXml,
        });
        const signatureValue = this.signer.signSha256RsaBase64(SignedInfo);
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
        
        return { xadesBes };    
    }

}
