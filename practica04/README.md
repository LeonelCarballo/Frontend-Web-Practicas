Práctica 04 

1. Express manda los rechazos de un handler async directo al middleware de errors, sin try/catch en cada ruta. ¿Qué tendrían que agregar en cada ruta si esto no fuera así?

Habría que poner un try/catch en cada ruta y llamar a next(err) dentro de cada catch para enviar el error al middleware.

2. ¿Por qué el servicio no lanza directamente un 409 en vez de EjemplarPrestadoError?

Porque el servicio es la capa de negocio y no debe conocer detalles de HTTP (como el 409). Al lanzar un error propio del dominio, la regla de negocio se mantiene limpia y se puede reutilizar en cualquier parte.

3. Si mañana agregaran una app móvil que también consume esta API, ¿qué archivos de esta práctica tendrían que tocar?

Ninguno del backend. La app móvil sería solo un nuevo cliente que usa los mismos endpoints y el mismo JSON, gracias a que la API está completamente desacoplada.
