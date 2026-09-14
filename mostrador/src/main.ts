import { cargarCatalogo } from './catalogo.js';
import { pedirOpcion, pedirTexto } from './entrada.js';
import { disponiblesDe, multaDe, prestar, type Mostrador } from './dominio/prestamos.js';
import { LibroNoEncontradoError, SinEjemplaresError } from './dominio/tipos.js';

const OPCIONES = [
    { valor: 'prestar', etiqueta: 'Prestar un libro' },
    { valor: 'catalogo', etiqueta: 'Ver catálogo' },
    { valor: 'prestamos', etiqueta: 'Ver préstamos' },
    { valor: 'salir', etiqueta: 'Salir' },
] as const;

type Opcion = (typeof OPCIONES)[number]['valor'];

function esOpcion(valor: string): valor is Opcion {
    return OPCIONES.some((o) => o.valor === valor);
}

const fecha = (d: Date) => d.toISOString().slice(0, 10); // YYYY-MM-DD

function verCatalogo(m: Mostrador): void {
    console.log('\n Catálogo de libros:');

    for (const l of m.libros) {
        const disponibles = disponiblesDe(m, l);
        console.log(`- ${l.titulo} (${l.autor}, ${l.anio ?? 's/a'}) - ${disponibles} ejemplares disponibles`);
    }

    console.log('');
}

function verPrestamos(m: Mostrador, hoy: Date): void {
    console.log('\n Préstamos:');

    for (const p of m.prestamos) {
        const estado = estadoDe(p, hoy);
        const multa = multaDe(p, estado, hoy);
        console.log(`- ${p.folio} - Libro: ${p.libroId} - Socio: ${p.socio} - Vence: ${fecha(p.venceEn)} - Estado: ${estado} - Multa: $${multa}`);
    }
}

async function hacerPrestamo(m: Mostrador, hoy: Date): Promise<void> {
    const libroId = await pedirTexto('Ingrese el ID del libro a prestar:');
    if (libroId === undefined) {
        console.log('No se ingresó un ID válido.');
        return;
    }

    const socio = await pedirTexto('Ingrese el nombre del socio:');
    if (socio === undefined) {
        console.log('No se ingresó un nombre de socio válido.');
        return;
    }

    try {
        const p = prestar(m, libroId.toUpperCase(), socio, hoy);
        console.log(`Préstamo realizado con éxito. Folio: ${p.folio}, vence el ${fecha(p.venceEn)}`);
    } catch (error) {
        if (error instanceof LibroNoEncontradoError || error instanceof SinEjemplaresError) {
            console.log(`Error: ${error.message}`);
        } else {
            console.log('Ocurrió un error inesperado al realizar el préstamo.');
        }
    }
}

async function main(): Promise<void> {
    const { libros, descartados } = cargarCatalogo('datos/catalogo.json');

    console.log('\n --MOSTRADOR BIBLIOTECA --');
    console.log(`Se cargaron ${libros.length} libros del catálogo.\n`);

    if (descartados > 0) {
        console.log(`Se descartaron ${descartados} entradas inválidas del catálogo.\n`);
    }

    const hoy = new Date();

    const m: Mostrador = { libros, prestamos: [] };

    for (;;) {
        const elegido = await pedirOpcion('Seleccione una opción:', OPCIONES);

        if (elegido === undefined) {
            console.log('No se seleccionó una opción válida. Intente de nuevo.');
            return;
        }

        switch (elegido) {
            case 'prestar':
                await hacerPrestamo(m, hoy);
                break;
            case 'catalogo':
                verCatalogo(m);
                break;
            case 'prestamos':
                verPrestamos(m, hoy);
                break;
            case 'salir':
                console.log('Saliendo del programa.');
                return;
            default:
                
        }
    }
}

void main();