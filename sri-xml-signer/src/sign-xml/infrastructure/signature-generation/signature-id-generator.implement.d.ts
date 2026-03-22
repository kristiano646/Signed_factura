import { SignatureIdentifiersInterface } from "../../domain/interfaces";
import { SignatureIdGeneratorPort } from "../../domain/ports";
export declare class SignatureIdGeneratorImplement implements SignatureIdGeneratorPort {
    generateAll(): SignatureIdentifiersInterface;
    p_obtener_aleatorio(): string;
}
