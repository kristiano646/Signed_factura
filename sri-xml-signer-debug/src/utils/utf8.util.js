export function utf8Encode(str) {
    if (str == null)
        throw new TypeError("Invalid input");
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    // Construye una cadena donde cada carácter representa un byte (como utf8.encode)
    return String.fromCharCode(...bytes);
}
export function utf8Decode(str) {
    if (str == null)
        throw new TypeError("Invalid input");
    // Reconstruye los bytes desde los caracteres
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
}
