export declare function uint8ArrayToBase64(bytes: Uint8Array): string;
/**
 * Convierte etiquetas autocerradas como <tag/> o <tag attr="value"/> en <tag></tag>
 * Compatible con HTML/XML básico sin namespaces.
 */
export declare function normalizeSelfClosingTags(xml: string): string;
