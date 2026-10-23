# portfolioMac

Portfolio de **Daniel Díaz Canosa**, estudiante de Desarrollo de Aplicaciones Web (DAW) en A Coruña, con el aspecto de un escritorio de macOS.

- Carpetas en el escritorio que se abren como ventanas de Finder: Sobre mí, Proyectos, Formación, Experiencia, Certificaciones y Herramientas.
- Dock con GitHub, LinkedIn, formulario de contacto (Mail), currículum y papelera.
- Certificados y CV en PDF, que se abren en una ventana tipo Vista Previa.
- Tres idiomas: español, inglés y portugués.
- Modo oscuro automático y versión móvil al estilo iPhone.

Hecho con HTML, CSS y JavaScript, sin librerías ni proceso de compilación.

## Estructura

```
index.html        Estructura de la página
css/styles.css    Diseño (escritorio, ventanas, dock, móvil)
js/content.js     Todos los textos y datos, en ES / EN / PT
js/app.js         Ventanas, carpetas, dock, menús e idioma
assets/           Fondo, foto, imágenes de proyectos y PDFs
```

Para cambiar cualquier texto, basta con editar `js/content.js`.

## Verlo en local

```bash
python -m http.server 5173
```

Y abrir `http://localhost:5173`.
