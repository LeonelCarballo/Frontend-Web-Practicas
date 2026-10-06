// =====================================================================
//  CHECKPOINT 4  —  el Service: aqui y SOLO aqui viven las reglas
// =====================================================================
//  Regla de negocio de esta practica:
//    "no se puede prestar un ejemplar que ya esta prestado"
//
//  LA PRUEBA DE FUEGO de este archivo:
//    ¿aparece la palabra `InMemory` en algun import? Si aparece, el
//    Service quedo acoplado a la infraestructura y el patron se rompio.
// =====================================================================

import type { PrestamoRepository } from '../dominio/prestamo.repository.js';
import type { Prestamo } from '../dominio/prestamo.entity.js';
import { nuevoFolio } from '../dominio/prestamo.entity.js';
import type { CrearPrestamoDto } from '../dto/crear-prestamo.dto.js';
import { EjemplarPrestadoError } from '../errores/ejemplar-prestado.error.js';

export class PrestamoService {
  constructor(private readonly repositorio: PrestamoRepository) {}

  async crear(dto: CrearPrestamoDto): Promise<Prestamo> {
    const prestamosDelLibro = await this.repositorio.findByLibro(dto.libroId);

    const ejemplaresFuera = prestamosDelLibro
      .filter((p) => p.estado !== 'devuelto')
      .flatMap((p) => p.ejemplares);

    for (const ejemplar of dto.ejemplares) {
      if (ejemplaresFuera.includes(ejemplar)) {
        throw new EjemplarPrestadoError(ejemplar);
      }
    }

    const nuevo: Prestamo = {
      ...dto,
      folio: nuevoFolio(),
      creadoEn: new Date(),
      estado: 'activo',
      costoReposicion: 0,
    };

    return this.repositorio.save(nuevo);
  }

  async listarPorLibro(libroId: string): Promise<Prestamo[]> {
    return this.repositorio.findByLibro(libroId);
  }
}