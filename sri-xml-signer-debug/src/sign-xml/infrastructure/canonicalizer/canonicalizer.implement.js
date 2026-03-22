import { ExclusiveCanonicalisation } from "./exclusive-canonicalization-ts/ExclusiveCanonicalization";
export class CanonicalizerImplement {
    constructor(context) {
        this.context = context;
    }
    async canonicalize() {
        const targetNode = this.context.getRootNode();
        const canonicalizer = new ExclusiveCanonicalisation({
            includeComments: false,
            inclusiveNamespaces: [],
        });
        return await canonicalizer.canonicalise(targetNode);
    }
}
