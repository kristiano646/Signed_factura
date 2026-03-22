import { SignXmlUseCase } from "../../application/use-cases";
describe("SignXmlUseCase", () => {
    const signerService = {
        sign: jest.fn(),
    };
    const injector = {
        insertSignature: jest.fn(),
    };
    const useCase = new SignXmlUseCase(signerService, injector);
    const certData = {
        certificate: {},
        certificateX509: "mockCertX509",
        serialNumber: "123456789",
        base64Der: "base64Hash",
        issuerName: "CN=Issuer",
        privateKey: {},
        publicKey: {
            modulus: "modBase64",
            exponent: "expBase64",
        },
    };
    it("debería firmar e insertar la firma en el XML correctamente", async () => {
        const xml = "<Factura>contenido</Factura>";
        signerService.sign.mockResolvedValueOnce({
            xadesBes: "<ds:Signature>firmaGenerada</ds:Signature>",
        });
        injector.insertSignature.mockReturnValueOnce("<FacturaFirmada/>");
        const result = await useCase.execute({ xmlToSign: xml, certData });
        expect(signerService.sign).toHaveBeenCalledWith({
            xmlToSign: xml,
            certData,
        });
        expect(injector.insertSignature).toHaveBeenCalledWith("<ds:Signature>firmaGenerada</ds:Signature>");
        expect(result).toBe("<FacturaFirmada/>");
    });
});
