export interface CanonicalizationOptions {
    includeComments?: boolean;
    includeProcessingInstructions?: boolean;
    nodeSet?: Set<Node>;
}
export declare class CanonicalXml10 {
    canonicalize(xml: string, options?: CanonicalizationOptions): Promise<string>;
    private renderNodes;
    private renderNode;
    private renderElement;
    private createFullNodeSet;
    private normalizeAndEscapeAttr;
    private normalizeAndEscapeText;
    private getVisibleNamespaces;
    private getInheritedXmlAttrs;
    private createAttr;
}
