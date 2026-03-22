import { ParsedP12Certificate } from "../domain/interfaces";
import { XadesSignatureService } from "../domain/xades-signature.service";
import { XmlSignatureInjector } from "../infrastructure/XmlSignatureInjector";
export declare class SignXmlUseCase {
    private readonly signerService;
    private readonly injector;
    constructor(signerService: XadesSignatureService, injector: XmlSignatureInjector);
    execute(input: {
        xmlToSign: string;
        certData: ParsedP12Certificate;
    }): Promise<string>;
}
