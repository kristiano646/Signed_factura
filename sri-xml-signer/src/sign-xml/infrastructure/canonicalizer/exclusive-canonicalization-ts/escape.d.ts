export declare const entities: Record<string, string>;
/**
 * Escapa caracteres especiales en atributos XML.
 * @param input - Cadena que contiene atributos XML.
 * @returns Cadena con entidades escapadas.
 */
export declare function escapeAttributeEntities(input: string): string;
/**
 * Escapa caracteres especiales en texto XML.
 * @param input - Texto dentro de elementos XML.
 * @returns Cadena con entidades escapadas.
 */
export declare function escapeTextEntities(input: string): string;
