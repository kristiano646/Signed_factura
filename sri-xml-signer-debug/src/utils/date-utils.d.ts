/**
 * Formatea una fecha al estilo "DDMMYYYY".
 */
export declare function formatDDMMYYYY(date: Date): string;
/**
 * Formatea una fecha al estilo "DDMM".
 */
export declare function formatDDMM(date: Date): string;
/**
 * Formatea una fecha en formato "YYYY-MM-DDTHH:mm:ss-05:00"
 * ajustando automáticamente al horario de Ecuador (UTC-5).
 * Si ya estás en Ecuador, no hace ninguna conversión.
 */
export declare function formatDateTimeEcuador(date?: Date): string;
