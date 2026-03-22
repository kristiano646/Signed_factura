import { ClockPort, CanonicalizerPort, SignatureIdGeneratorPort, SignerPort, HashProviderPort } from "./ports";
import { SignatureData } from "./signature-data";
import { XadesBesResultInterface } from "./interfaces";
export declare class XadesSignatureService {
    private readonly clock;
    private readonly canonicalizer;
    private readonly hasher;
    private readonly idGenerator;
    private readonly signer;
    constructor(clock: ClockPort, canonicalizer: CanonicalizerPort, hasher: HashProviderPort, idGenerator: SignatureIdGeneratorPort, signer: SignerPort);
    sign(data: SignatureData): Promise<XadesBesResultInterface>;
}
