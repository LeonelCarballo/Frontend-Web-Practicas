type EstadoPrestamo = 'activo' | 'vencido' | 'devuelto';
interface Prestamo {
    folio: string;
    multa: number;
    ejemplar: number;
    estado: EstadoPrestamo;
    socio?: string;
}

function calcularMulta(prestamo: Prestamo): number {
    return prestamo.multa + 50;
}

function reciboDe(prestamo: Prestamo): string {
    if (prestamo.socio === undefined) {
        return 'Recibo de socio no registrado'
    }
    return `Recibo de ${prestamo.socio}`;
}

const prestamo: Prestamo = {
    folio: 'F001',
    multa: 350,
    ejemplar: 14,
    estado: 'vencido',
    socio: 'Juan Perez'
};

console.log(reciboDe(prestamo));
console.log(calcularMulta(prestamo));
