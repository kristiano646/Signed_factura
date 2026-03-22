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
        const cleanedXml = xmlToSign
            .replace(/>\s+</g, '><') // Eliminar espacios entre etiquetas
            .replace(/\s+/g, ' ') // Reemplazar múltiples espacios con uno solo
            .replace(/>\s+/g, '>') // Eliminar espacios después de >
            .replace(/\s+</g, '<') // Eliminar espacios antes de <
            .replace(/^\s+|\s+$/g, '') // Eliminar espacios al inicio y final
            .replace(/(\r\n|\n|\r)/g, '') // Eliminar todos los saltos de línea
            .trim(); // Eliminar espacios residuales
        // CALCULAR DIGEST DEL COMPROBANTE ANTES DE AGREGAR FIRMA
        const canonicalizedXml = await this.canonicalizer.canonicalize(cleanedXml);
        const digestXml = this.hasher.sha256Base64(utf8Encode(canonicalizedXml));
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
        const sha256_SignedProperties = this.hasher.sha256Base64(utf8Encode(SignedProperties));
        const KeyInfo = new KeyInfoBuilder().build({
            certificateNumber: ids.certificateNumber.toString(),
            certificateX509,
            modulus,
            exponent,
        });
        const sha256_certificado = this.hasher.sha256Base64(KeyInfo);
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
        const cleanedXadesBes = xadesBes
            .replace(/>\s+</g, '><') // Eliminar espacios entre etiquetas
            .replace(/\s+/g, ' ') // Reemplazar múltiples espacios con uno solo
            .replace(/>\s+/g, '>') // Eliminar espacios después de >
            .replace(/\s+</g, '<') // Eliminar espacios antes de <
            .replace(/^\s+|\s+$/g, '') // Eliminar espacios al inicio y final
            .replace(/(\r\n|\n|\r)/g, '') // Eliminar todos los saltos de línea
            .trim(); // Eliminar espacios residuales
        console.log("🧼 DESPUÉS DE LIMPIEZA FINAL - Longitud:", cleanedXadesBes.length);
        console.log("🧼 DESPUÉS DE LIMPIEZA FINAL - Contiene saltos de línea:", cleanedXadesBes.includes('\n'));
        return { xadesBes: cleanedXadesBes };
    }
}
