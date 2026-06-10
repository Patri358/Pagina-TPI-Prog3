import { describe, test, expect } from "vitest";
import { calcularTotal } from "./CartProvider";

describe("Prueba: función calcularTotal de CartProvider", () => {

    test("Debe sumar todos los productos del array correctamente", () => {

        const carritoSimulado = [
            { id: "1", title: "Red Dead Redemption 2", price: 50 },
            { id: "2", title: "Elden Ring", price: 40.99 },
            { id: "3", title: "Counter Strike 2", price: 0 }
        ];

        const resultado = calcularTotal(carritoSimulado);

        expect(resultado).toBeCloseTo(90.99,2);
    });

    test("Debería retornar 0 si el carrito no tiene productos", () => {
        const resultado = calcularTotal([]);
        expect(resultado).toBe(0);
    });
});