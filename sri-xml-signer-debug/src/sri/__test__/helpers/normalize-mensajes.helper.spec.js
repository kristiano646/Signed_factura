import { normalizeSriMessages } from "../../helpers";
describe("normalizeSriMessages", () => {
    it("debería retornar null si el mensaje es undefined", () => {
        expect(normalizeSriMessages(undefined)).toBeNull();
    });
    it("debería envolver un objeto mensaje en un array", () => {
        const mensaje = {
            identificador: "01",
            mensaje: "Mensaje simple",
            tipo: "INFO",
        };
        const result = normalizeSriMessages(mensaje);
        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(1);
        expect(result === null || result === void 0 ? void 0 : result[0]).toEqual(mensaje);
    });
    it("debería retornar el array original si ya es un array", () => {
        const mensajes = [
            { identificador: "01", mensaje: "Uno", tipo: "INFO" },
            { identificador: "02", mensaje: "Dos", tipo: "ADVERTENCIA" },
        ];
        const result = normalizeSriMessages(mensajes);
        expect(result).toBe(mensajes); // misma referencia
        expect(result).toHaveLength(2);
    });
});
