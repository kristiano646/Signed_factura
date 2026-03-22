// algorithm.ts
export class Algorithm {
    constructor(options) {
        this.options = options;
        // Inicializa con opciones si es necesario
    }
    name() {
        return null; // Devuelve el nombre del algoritmo si aplica
    }
    /**
     * Canonicaliza un nodo XML.
     * @param node Nodo XML a procesar.
     * @returns Una promesa que se resuelve con el resultado canonicalizado.
     */
    async canonicalise(node) {
        // Simula una operación asincrónica no implementada
        throw new Error("not implemented");
    }
}
