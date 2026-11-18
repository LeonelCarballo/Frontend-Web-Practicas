## Preguntas

**¿Por qué se usa un contexto y no props para la sesión?**
Se usa un contexto porque la sesión es un estado global que necesitan varias partes de la aplicación, no un dato exclusivo de un solo componente.

**¿Qué pasa si un componente usa la sesión fuera del proveedor?**
Devuelve null y el hook lanza un error indicando que useSesion debe usarse dentro del proveedor de sesión.

**¿Dónde se guarda el token y qué riesgo tiene ese lugar?**
Se guarda en el localstorage junto con los datos del usuario en formato JSON. El riesgo es que cualquier script en el navegador puede leerlo, por lo que queda expuesto a ataques XSS donde un atacante podría robar el token y suplantar la sesión.