import * as forge from "node-forge";
import { BancoCentralStrategy } from "../../../../infrastructure/certificate/strategies";
import { PrivateKeyExtractionError, SigningKeyNotFoundError, } from "../../../../infrastructure/errors";
describe("BancoCentralStrategy", () => {
    const strategy = new BancoCentralStrategy();
    describe("supports", () => {
        it("debería retornar true si el nombre contiene 'BANCO CENTRAL'", () => {
            expect(strategy.supports("Certificado BANCO CENTRAL DEL ECUADOR")).toBe(true);
        });
        it("debería retornar false si el nombre no contiene 'BANCO CENTRAL'", () => {
            expect(strategy.supports("Otro Certificado")).toBe(false);
        });
    });
    describe("getPrivateKey", () => {
        it("debería retornar item.key si está presente", async () => {
            const fakeKey = { mock: "key" };
            const bags = [
                {
                    attributes: { friendlyName: ["Signing Key"] },
                    key: fakeKey,
                },
            ];
            const result = await strategy.getPrivateKey(bags);
            expect(result).toBe(fakeKey);
        });
        it("debería convertir y retornar item.asn1 si no hay key", async () => {
            const fakeAsn1 = {};
            const bags = [
                {
                    attributes: { friendlyName: ["Signing Key"] },
                    asn1: fakeAsn1,
                },
            ];
            const spy = jest
                .spyOn(forge.pki, "privateKeyFromAsn1")
                .mockReturnValue("convertedKey");
            const result = await strategy.getPrivateKey(bags);
            expect(spy).toHaveBeenCalledWith(fakeAsn1);
            expect(result).toBe("convertedKey");
        });
        it("debería lanzar SigningKeyNotFoundError si no encuentra ningún bag", async () => {
            const bags = [
                {
                    attributes: { friendlyName: ["Otro Nombre"] },
                },
            ];
            await expect(strategy.getPrivateKey(bags)).rejects.toThrow(SigningKeyNotFoundError);
        });
        it("debería lanzar PrivateKeyExtractionError si no hay key ni asn1", async () => {
            const bags = [
                {
                    attributes: { friendlyName: ["Signing Key"] },
                },
            ];
            await expect(strategy.getPrivateKey(bags)).rejects.toThrow(PrivateKeyExtractionError);
        });
    });
    describe("overrideIssuerName", () => {
        it("debería retornar el issuer name formateado", async () => {
            const certBags = {
                [forge.pki.oids.certBag]: [
                    {
                        cert: {
                            issuer: {
                                attributes: [
                                    { shortName: "C", value: "EC" },
                                    { shortName: "O", value: "Banco Central" },
                                    { shortName: "CN", value: "Autoridad de Certificación" },
                                ],
                            },
                        },
                    },
                ],
            };
            const result = await strategy.overrideIssuerName(certBags);
            expect(result).toBe("CN=Autoridad de Certificación,O=Banco Central,C=EC");
        });
    });
});
