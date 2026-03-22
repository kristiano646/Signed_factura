export function uint8ArrayToBase64(bytes) {
    let binary = "";
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
/**
 * Convierte etiquetas autocerradas como <tag/> o <tag attr="value"/> en <tag></tag>
 * Compatible con HTML/XML básico sin namespaces.
 */
export function normalizeSelfClosingTags(xml) {
    return xml.replace(/<([\w:-]+)([^>]*)\/>/g, (_match, tag, attrs) => {
        return `<${tag}${attrs}></${tag}>`;
    });
}
