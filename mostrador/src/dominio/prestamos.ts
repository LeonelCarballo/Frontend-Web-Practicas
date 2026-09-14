import { type EstadoPrestamo, type Libro, type Prestamo, LibroNoEncontradoError, SinEjemplaresError } from "./tipos.js";

export const DIAS_DE_PRESTAMO = 14;

export const MULTA_POR_DIA = 5;

const UN_DIA = 86_400_000; //Milisegundos en un dia

export interface Mostrador{
    libros: Libro[],
    prestamos: Prestamo[]
}

export function disponiblesDe(m: Mostrador, libro: Libro): number {

    const prestados = m.prestamos.filter(
        (p) => p.libroId && p .devueltoEn === undefined
    ).length

    return Math.max(0, libro.ejemplares - prestados);

}

export function prestar(m: Mostrador, libroId: string, socio: string, hoy: Date): Prestamo {
    const libro = m.libros.find((l) => l.id === libroId);
    if (libro === undefined) {
        throw new LibroNoEncontradoError(`No se encontró el libro con id ${libroId}`);
    }

    if (disponiblesDe(m, libro) === 0) {
        throw new SinEjemplaresError(`No hay ejemplares disponibles del libro ${libro.titulo}`);
    }

    const prestamo: Prestamo = {
        folio: `P-${String(m.prestamos.length + 1).padStart(4, '0')}`,
        libroId: libro.id,
        socio,
        venceEn: new Date(hoy.getTime() + DIAS_DE_PRESTAMO * UN_DIA)
    }

    m.prestamos.push(prestamo);

    return prestamo;

}

export function multaDe(p: Prestamo, estado: EstadoPrestamo, hoy: Date): number{
    const referencia = p.devueltoEn ?? hoy;

    const dias = Math.max(0, Math.ceil(referencia.getTime() - p.venceEn.getTime() / UN_DIA));

    switch (estado) {
        case 'activo':
            return 0;
        case 'vencido':
        case 'devuelto':
            return dias * MULTA_POR_DIA;
        default:
            const _exhaustivo: never = estado;
            return _exhaustivo;        
    }
} 