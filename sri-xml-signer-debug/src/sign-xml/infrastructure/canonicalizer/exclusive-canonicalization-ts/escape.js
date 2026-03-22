// entities.ts
// Mapeo de caracteres especiales a sus entidades XML
export const entities = {
    "&": "&amp;",
    '"': "&quot;",
    "<": "&lt;",
    ">": "&gt;",
    "\t": "&#x9;",
    "\n": "&#xA;",
    "\r": "&#xD;",
};
/**
 * Escapa caracteres especiales en atributos XML.
 * @param input - Cadena que contiene atributos XML.
 * @returns Cadena con entidades escapadas.
 */
export function escapeAttributeEntities(input) {
    return input.replace(/([&<"\t\n\r])/g, (char) => entities[char]);
}
/**
 * Escapa caracteres especiales en texto XML.
 * @param input - Texto dentro de elementos XML.
 * @returns Cadena con entidades escapadas.
 */
export function escapeTextEntities(input) {
    return input.replace(/([&<>\r])/g, (char) => entities[char]);
}
