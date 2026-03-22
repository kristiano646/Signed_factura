import * as forge from "node-forge";
import { ForgeRsaSha1Signer } from "../../infrastructure/forge-rsa-sha1-signer.implementation";
describe("ForgeRsaSha1Signer", () => {
    let signer;
    beforeEach(() => {
        // 🔐 Generar una clave RSA real (¡evita en producción por rendimiento!)
        const keypair = forge.pki.rsa.generateKeyPair(1024);
        signer = new ForgeRsaSha1Signer(keypair.privateKey);
    });
    it("debería firmar el input con SHA1 y devolver Base64 válido", () => {
        const input = "<test>data</test>";
        const result = signer.signSha1RsaBase64(input);
        expect(result).toMatch(/^[A-Za-z0-9+/=\n]+$/);
    });
    it("debería dividir la firma en líneas de 76 caracteres máximo", () => {
        const input = "dato largo para probar la longitud y formato del output";
        const result = signer.signSha1RsaBase64(input);
        const lines = result.split("\n");
        expect(lines.every((line) => line.length <= 76)).toBe(true);
    });
    it("debería ser determinista con la misma clave y contenido", () => {
        const input = "contenido fijo";
        const signature1 = signer.signSha1RsaBase64(input);
        const signature2 = signer.signSha1RsaBase64(input);
        expect(signature1).toBe(signature2);
    });
});
