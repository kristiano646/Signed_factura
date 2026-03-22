import { Algorithm, CanonicalizationOptions } from "./Algorithm";
export interface Namespace {
    prefix: string;
    namespaceURI: string;
}
export declare class ExclusiveCanonicalisation extends Algorithm {
    private includeComments;
    private inclusiveNamespaces;
    constructor(options?: CanonicalizationOptions);
    name(): string;
    getIncludeComments(): boolean;
    setIncludeComments(include: boolean): void;
    getInclusiveNamespaces(): string[];
    setInclusiveNamespaces(namespaces: string[]): this;
    addInclusiveNamespace(ns: string): this;
    canonicalise(node: Node): Promise<string>;
    private _compareAttributes;
    private _compareNamespaces;
    private _renderAttributes;
    private _renderNamespace;
    private _renderComment;
    private _renderProcessingInstruction;
    private _processInner;
}
