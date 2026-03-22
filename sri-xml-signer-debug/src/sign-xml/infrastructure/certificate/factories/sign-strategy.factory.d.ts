import { SignStrategy } from "../../interfaces";
export declare class SignStrategyFactory {
    private readonly strategies;
    getStrategy(friendlyName: string): SignStrategy;
}
