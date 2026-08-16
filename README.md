# Around The U.S.

Proyecto de práctica desarrollado como parte del programa de Desarrollo Web de TripleTen. Es una galería de tarjetas de lugares con perfil de usuario editable, construida desde cero aplicando maquetación responsiva, validación de formularios y, en su etapa final, una arquitectura orientada a objetos con TypeScript.

## Descripción

Around The U.S. permite:
- Ver una galería de tarjetas con imágenes y nombres de lugares.
- Editar el nombre y la descripción del perfil de usuario.
- Agregar nuevas tarjetas con título e imagen.
- Dar "me gusta" y eliminar tarjetas.
- Ver una imagen ampliada al hacer clic en una tarjeta.
- Validación en tiempo real de los formularios, con mensajes de error nativos del navegador.

## Tecnologías y técnicas utilizadas

- **HTML5** — etiquetas semánticas y atributos de validación nativa (`required`, `minlength`, `maxlength`, `type="url"`, `novalidate`).
- **CSS3** — maquetación adaptativa (responsive design) con Flexbox, Grid Layout, media queries y pseudo-clases como `:disabled`.
- **JavaScript (ES6)** — manipulación del DOM, manejo de eventos, módulos (`import`/`export`).
- **TypeScript** — tipado estático, interfaces, tipos genéricos y programación orientada a objetos (clases, encapsulamiento, herencia, polimorfismo).

## Arquitectura (Sprint 8 — POO y TypeScript)

En su versión final, el proyecto fue refactorizado a una arquitectura de clases con TypeScript, separando responsabilidades en archivos independientes:

| Clase | Responsabilidad |
|---|---|
| `FormValidator` | Valida los campos de un formulario en tiempo real y controla el estado del botón de envío. |
| `Card` | Construye una tarjeta individual a partir de una plantilla y datos, y maneja sus interacciones (like, eliminar, clic en imagen). |
| `Section` | Renderiza una lista de elementos en un contenedor del DOM, de forma genérica (tipos genéricos `<T>`). |
| `Popup` | Clase base para ventanas modales: abrir, cerrar, cerrar con Esc o clic fuera del modal. |
| `PopupWithImage` | Hereda de `Popup`; muestra una imagen ampliada con leyenda. |
| `PopupWithForm` | Hereda de `Popup`; gestiona el envío de un formulario dentro de un modal. |
| `UserInfo` | Obtiene y actualiza la información del perfil de usuario en la página. |

## Historial de sprints

**Sprint 7:** validación de formularios (`Editar perfil` y `Nuevo lugar`) con atributos nativos del navegador, cierre de modales al hacer clic fuera de ellos o al presionar Esc, y organización del código de validación en un módulo ES6 independiente (`validate.js`).

**Sprint 8:** migración completa del proyecto a TypeScript, aplicando programación orientada a objetos: encapsulamiento (propiedades `private`/`protected`), herencia (`extends`/`super`) y tipado (`interface`, tipos genéricos, tipos de función).
