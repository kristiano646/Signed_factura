import { DOMParser } from "@xmldom/xmldom";
export class CanonicalXml10 {
    async canonicalize(xml, options) {
        var _a;
        if (/<!DOCTYPE/i.test(xml)) {
            throw new Error("Canonical XML 1.0 forbids DTDs");
        }
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "application/xml");
        const nodeSet = (_a = options === null || options === void 0 ? void 0 : options.nodeSet) !== null && _a !== void 0 ? _a : this.createFullNodeSet(doc);
        return this.renderNodes(Array.from(doc.childNodes), nodeSet, options);
    }
    async renderNodes(nodes, nodeSet, options) {
        let result = "";
        for (const node of nodes) {
            result += await this.renderNode(node, nodeSet, options);
        }
        return result;
    }
    async renderNode(node, nodeSet, options) {
        if (!nodeSet.has(node))
            return "";
        switch (node.nodeType) {
            case 1: // ELEMENT_NODE
                return this.renderElement(node, nodeSet, options);
            case 3: // TEXT_NODE
                return node.nodeValue
                    ? this.normalizeAndEscapeText(node.nodeValue)
                    : "";
            case 4: // CDATA_SECTION_NODE
                return node.nodeValue
                    ? this.normalizeAndEscapeText(node.nodeValue)
                    : "";
            case 5: // ENTITY_REFERENCE_NODE
                return this.renderNodes(Array.from(node.childNodes), nodeSet, options);
            case 7: // PROCESSING_INSTRUCTION_NODE
                if (options === null || options === void 0 ? void 0 : options.includeProcessingInstructions) {
                    const pi = node;
                    return pi.data ? `<?${pi.target} ${pi.data}?>` : `<?${pi.target}?>`;
                }
                return "";
            case 8: // COMMENT_NODE
                return (options === null || options === void 0 ? void 0 : options.includeComments)
                    ? `<!--${node.data}-->`
                    : "";
            case 9: // DOCUMENT_NODE
                return this.renderNodes(Array.from(node.childNodes), nodeSet, options);
            case 10: // DOCUMENT_TYPE_NODE
                return ""; // Siempre excluido
            default:
                return "";
        }
    }
    async renderElement(elem, nodeSet, options) {
        const tagName = elem.tagName;
        // Obtener namespaces visibles (sin redundancias)
        const nsAttrs = this.getVisibleNamespaces(elem);
        // Filtrar atributos (excluir namespaces y atributos predeterminados)
        const normalAttrs = Array.from(elem.attributes).filter((attr) => {
            var _a;
            return !attr.name.startsWith("xmlns") &&
                !((_a = attr.prefix) === null || _a === void 0 ? void 0 : _a.startsWith("xmlns")) &&
                attr.specified;
        } // Excluir atributos predeterminados de DTD
        );
        // Obtener atributos XML heredados
        const xmlAttrs = this.getInheritedXmlAttrs(elem);
        // Ordenar namespaces
        nsAttrs.sort((a, b) => a.name.localeCompare(b.name) || a.value.localeCompare(b.value));
        // Ordenar atributos
        const allAttrs = [...normalAttrs, ...xmlAttrs];
        allAttrs.sort((a, b) => {
            const nsA = a.namespaceURI || "";
            const nsB = b.namespaceURI || "";
            return nsA.localeCompare(nsB) || a.localName.localeCompare(b.localName);
        });
        // Construir apertura de elemento
        let open = `<${tagName}`;
        // Agregar namespaces
        for (const attr of nsAttrs) {
            open += ` ${attr.name}="${this.normalizeAndEscapeAttr(attr.value)}"`;
        }
        // Agregar atributos
        for (const attr of allAttrs) {
            const attrName = attr.prefix
                ? `${attr.prefix}:${attr.localName}`
                : attr.localName;
            open += ` ${attrName}="${this.normalizeAndEscapeAttr(attr.value)}"`;
        }
        // Manejar elementos vacíos correctamente
        const hasChildren = elem.childNodes.length > 0;
        open += hasChildren ? ">" : "/>";
        // Procesar hijos si existen
        if (hasChildren) {
            const children = await this.renderNodes(Array.from(elem.childNodes), nodeSet, options);
            return open + children + `</${tagName}>`;
        }
        return open;
    }
    createFullNodeSet(node) {
        const set = new Set();
        const traverse = (n) => {
            set.add(n);
            for (let i = 0; i < n.childNodes.length; i++) {
                traverse(n.childNodes[i]);
            }
        };
        traverse(node);
        return set;
    }
    normalizeAndEscapeAttr(str) {
        // Normalización Canonical XML
        return str
            .replace(/\r\n?/g, "\n") // Normalizar retornos de carro
            .replace(/[\t\n\r]/g, " ") // Normalizar espacios
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;")
            .normalize("NFC"); // Forma de normalización Unicode
    }
    normalizeAndEscapeText(str) {
        // Normalización Canonical XML
        return str
            .replace(/\r\n?/g, "\n") // Normalizar retornos de carro
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .normalize("NFC"); // Forma de normalización Unicode
    }
    getVisibleNamespaces(elem) {
        // Namespaces activos (prefijo -> URI)
        const activeNamespaces = new Map();
        const result = [];
        // Función para agregar namespace si es necesario
        const addNamespace = (prefix, uri) => {
            const currentUri = activeNamespaces.get(prefix);
            if (currentUri !== uri) {
                activeNamespaces.set(prefix, uri);
                result.push({
                    name: prefix ? `xmlns:${prefix}` : "xmlns",
                    value: uri,
                });
            }
        };
        // Recorrer ancestros desde la raíz hasta el elemento actual
        const ancestors = [];
        let current = elem;
        while (current) {
            ancestors.unshift(current);
            current = current.parentElement;
        }
        // Procesar desde la raíz hacia el elemento actual
        for (const ancestor of ancestors) {
            // Recolectar declaraciones en este elemento
            Array.from(ancestor.attributes).forEach((attr) => {
                if (attr.name === "xmlns") {
                    addNamespace("", attr.value);
                }
                else if (attr.prefix === "xmlns") {
                    addNamespace(attr.localName, attr.value);
                }
            });
        }
        return result;
    }
    getInheritedXmlAttrs(elem) {
        const xmlAttrs = new Map();
        // Buscar desde el elemento actual hacia arriba
        let current = elem;
        while (current) {
            for (const attr of Array.from(current.attributes)) {
                const isXmlAttr = attr.namespaceURI === "http://www.w3.org/XML/1998/namespace" ||
                    attr.name.startsWith("xml:");
                if (isXmlAttr) {
                    const localName = attr.localName;
                    // Solo agregar si no ha sido definido más cerca
                    if (!xmlAttrs.has(localName)) {
                        xmlAttrs.set(localName, attr.value);
                    }
                }
            }
            current = current.parentElement;
        }
        return Array.from(xmlAttrs).map(([localName, value]) => this.createAttr(`xml:${localName}`, value, "http://www.w3.org/XML/1998/namespace"));
    }
    createAttr(name, value, namespaceURI) {
        return {
            name,
            value,
            namespaceURI,
            localName: name.split(":")[1] || name,
            prefix: name.startsWith("xml:") ? "xml" : null,
        };
    }
}
