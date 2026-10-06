import { test } from 'node:test';
import assert from 'node:assert/strict';

import { InMemoryPrestamoRepository } from '../infra/in-memory-prestamo.repository.js';
import { PrestamoService } from './prestamo.service.js';
import { EjemplarPrestadoError } from '../errores/ejemplar-prestado.error.js';

test('camino feliz: crea un prestamo cuando el ejemplar esta libre', async () => {
  const repositorio = new InMemoryPrestamoRepository();
  const servicio = new PrestamoService(repositorio);

  const prestamo = await servicio.crear({
    libroId: 'LIB-0001',
    socioId: 'S-100',
    ejemplares: [1, 2],
  });

  assert.equal(prestamo.libroId, 'LIB-0001');
  assert.equal(prestamo.estado, 'activo');
  assert.deepEqual(prestamo.ejemplares, [1, 2]);
});

test('ejemplar duplicado: rechaza el prestamo con EjemplarPrestadoError', async () => {
  const repositorio = new InMemoryPrestamoRepository();
  const servicio = new PrestamoService(repositorio);

  await servicio.crear({
    libroId: 'LIB-0002',
    socioId: 'S-200',
    ejemplares: [5],
  });

  await assert.rejects(
    () =>
      servicio.crear({
        libroId: 'LIB-0002',
        socioId: 'S-300',
        ejemplares: [5],
      }),
    EjemplarPrestadoError,
  );
});