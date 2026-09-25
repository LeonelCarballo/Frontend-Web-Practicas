1. ¿Hizo falta una base de datos real para probar la regla de negocio? ¿Qué dice eso sobre para qué sirve el patrón Repository?

No, se usó InMemoryPrestamoRepository (un simple Map en memoria). El patrón Repository sirve para separar la lógica de negocio del almacenamiento, permitiendo probar las reglas sin levantar bases de datos externas.

2. El Service recibe el repositorio como Repository, no InMemoryPrestamoRepository. ¿Qué se rompía si usaban la clase concreta?

El Service se acoplaría a una implementación específica. Al cambiar de base de datos habría que modificar el código del Service, rompiendo la regla de que la capa de dominio no debe depender de la infraestructura.

3. Si cambiaran el Map en memoria por una base de datos real, ¿cuántos archivos tocarían? ¿Por qué tan pocos?

Solo 2 archivos:

Un archivo nuevo con la clase que conecte a la base de datos real.

main.ts para instanciar el nuevo repositorio.

Son tan pocos porque el Service depende de una interfaz y no de una tecnología concreta.


