export interface CanonicalizationOptions {
}
export declare class Algorithm {
    private options?;
    constructor(options?: CanonicalizationOptions);
    name(): string | null;
    /**
     * Canonicaliza un nodo XML.
     * @param node Nodo XML a procesar.
     * @returns Una promesa que se resuelve con el resultado canonicalizado.
     */
    canonicalise(node: Node): Promise<string>;
}
export interface CanonicalizationOptions {
    includeComments?: boolean;
    inclusiveNamespaces?: string[];
}
