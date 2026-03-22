// exclusive-canonicalisation.ts
import { Algorithm } from "./Algorithm";
import { escapeAttributeEntities, escapeTextEntities } from "./escape";
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const PROCESSING_INSTRUCTION_NODE = 7;
const COMMENT_NODE = 8;
export class ExclusiveCanonicalisation extends Algorithm {
    constructor(options = {}) {
        super(options);
        this.includeComments = !!options.includeComments;
        this.inclusiveNamespaces = options.inclusiveNamespaces || [];
    }
    name() {
        return ("http://www.w3.org/2001/10/xml-exc-c14n#" +
            (this.includeComments ? "WithComments" : ""));
    }
    getIncludeComments() {
        return this.includeComments;
    }
    setIncludeComments(include) {
        this.includeComments = !!include;
    }
    getInclusiveNamespaces() {
        return [...this.inclusiveNamespaces];
    }
    setInclusiveNamespaces(namespaces) {
        this.inclusiveNamespaces = [...namespaces];
        return this;
    }
    addInclusiveNamespace(ns) {
        this.inclusiveNamespaces.push(ns);
        return this;
    }
    async canonicalise(node) {
        return this._processInner(node);
    }
    _compareAttributes(a, b) {
        if (!a.prefix && b.prefix)
            return -1;
        if (!b.prefix && a.prefix)
            return 1;
        return a.name.localeCompare(b.name);
    }
    _compareNamespaces(a, b) {
        const attr1 = a.prefix + a.namespaceURI;
        const attr2 = b.prefix + b.namespaceURI;
        return attr1.localeCompare(attr2);
    }
    _renderAttributes(node) {
        return Array.from(node.attributes || [])
            .filter((attr) => !attr.name.startsWith("xmlns"))
            .sort(this._compareAttributes)
            .map((attr) => ` ${attr.name}="${escapeAttributeEntities(attr.value)}"`)
            .join("");
    }
    _renderNamespace(node, prefixesInScope, defaultNamespace) {
        let res = "";
        let newDefaultNamespace = defaultNamespace;
        const newPrefixesInScope = [...prefixesInScope];
        const nsListToRender = [];
        const currentNamespace = node.namespaceURI || "";
        if (node.prefix) {
            const existing = newPrefixesInScope.find((e) => e.prefix === node.prefix);
            if (!existing || existing.namespaceURI !== node.namespaceURI) {
                newPrefixesInScope.filter((e) => e.prefix !== node.prefix);
                nsListToRender.push({
                    prefix: node.prefix,
                    namespaceURI: node.namespaceURI,
                });
                newPrefixesInScope.push({
                    prefix: node.prefix,
                    namespaceURI: node.namespaceURI,
                });
            }
        }
        else if (defaultNamespace !== currentNamespace) {
            newDefaultNamespace = currentNamespace;
            res += ` xmlns="${escapeAttributeEntities(newDefaultNamespace)}"`;
        }
        for (const attr of Array.from(node.attributes || [])) {
            if (attr.prefix && attr.prefix !== "xmlns") {
                const existing = newPrefixesInScope.find((e) => e.prefix === attr.prefix);
                if (!existing || existing.namespaceURI !== attr.namespaceURI) {
                    newPrefixesInScope.filter((e) => e.prefix !== attr.prefix);
                    nsListToRender.push({
                        prefix: attr.prefix,
                        namespaceURI: attr.namespaceURI,
                    });
                    newPrefixesInScope.push({
                        prefix: attr.prefix,
                        namespaceURI: attr.namespaceURI,
                    });
                }
            }
            else if (attr.prefix === "xmlns" &&
                this.inclusiveNamespaces.includes(attr.localName)) {
                nsListToRender.push({
                    prefix: attr.localName,
                    namespaceURI: attr.nodeValue,
                });
            }
        }
        nsListToRender.sort(this._compareNamespaces);
        for (const ns of nsListToRender) {
            res += ` xmlns:${ns.prefix}="${escapeAttributeEntities(ns.namespaceURI)}"`;
        }
        return { rendered: res, newPrefixesInScope, newDefaultNamespace };
    }
    _renderComment(node) {
        return `<!--${escapeTextEntities(node.data)}-->`;
    }
    _renderProcessingInstruction(node) {
        return `<?${node.target}${node.data ? " " + escapeTextEntities(node.data) : ""}?>`;
    }
    _processInner(node, prefixesInScope = [], defaultNamespace = "") {
        switch (node.nodeType) {
            case TEXT_NODE:
                return escapeTextEntities(node.data);
            case COMMENT_NODE:
                return this.includeComments ? this._renderComment(node) : "";
            case PROCESSING_INSTRUCTION_NODE:
                return this._renderProcessingInstruction(node);
            case ELEMENT_NODE: {
                const el = node;
                const ns = this._renderNamespace(el, prefixesInScope, defaultNamespace);
                const attrs = this._renderAttributes(el);
                const children = Array.from(el.childNodes)
                    .map((child) => this._processInner(child, ns.newPrefixesInScope, ns.newDefaultNamespace))
                    .join("");
                return `<${el.tagName}${ns.rendered}${attrs}>${children}</${el.tagName}>`;
            }
            default:
                return "";
        }
    }
}
