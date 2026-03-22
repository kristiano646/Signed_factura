/**
 * Wrapper para node-forge que funciona con ESM y CommonJS
 * Usa createRequire() para forzar node-forge a cargarse como CommonJS
 */
export declare function getForge(): Promise<any>;
export declare function getForgeSync(): any;
