import { UnknownSignStrategyError } from "../../errors";
import { BancoCentralStrategy, SecurityDataStrategy, UanatacaStrategy, } from "../strategies";
import { AnfacStrategy } from "../strategies/anfac.strategy";
import { EntidadCertificacionStrategy } from "../strategies/entidad-certificacion.strategy";
export class SignStrategyFactory {
    constructor() {
        this.strategies = [
            new BancoCentralStrategy(),
            new SecurityDataStrategy(),
            new UanatacaStrategy(),
            new AnfacStrategy(),
            new EntidadCertificacionStrategy()
        ];
    }
    getStrategy(friendlyName) {
        const strategy = this.strategies.find((s) => s.supports(friendlyName));
        if (!strategy) {
            throw new UnknownSignStrategyError(friendlyName);
        }
        return strategy;
    }
}
