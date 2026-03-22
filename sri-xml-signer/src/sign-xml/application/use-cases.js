export class SignXmlUseCase {
    constructor(signerService, injector) {
        this.signerService = signerService;
        this.injector = injector;
    }
    async execute(input) {
        const { xmlToSign, certData } = input;
        const signatureXml = await this.signerService.sign({
            xmlToSign,
            certData,
        });
        const finalXml = this.injector.insertSignature(signatureXml.xadesBes);
        return finalXml;
    }
}
