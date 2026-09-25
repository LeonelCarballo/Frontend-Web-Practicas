"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calcularMulta(prestamo) {
    return prestamo.multa + 50;
}
function reciboDe(prestamo) {
    if (prestamo.socio === undefined) {
        return 'Recibo de socio no registrado';
    }
    return `Recibo de ${prestamo.socio}`;
}
const prestamo = {
    folio: 'F001',
    multa: 350,
    ejemplar: 14,
    estado: 'vencido',
    socio: 'Juan Perez'
};
console.log(reciboDe(prestamo));
console.log(calcularMulta(prestamo));
//# sourceMappingURL=multas.js.map