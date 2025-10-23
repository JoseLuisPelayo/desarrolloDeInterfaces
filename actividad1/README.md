# Tarjeta de producto interactiva (HTML/CSS/JS)

Componente reutilizable de **tarjeta de producto** que renderiza tarjetas desde un JSON, permite **Ver más** (collapse), abre un **modal** de compra y valida un **formulario**. Todo el flujo es *front‑end* con **Bootstrap 5** (CDN) y **ES Modules**.

## Características
- Render dinámico de tarjetas a partir de `data/products.json`.
- Botones **Comprar** y **Ver más** (collapse Bootstrap) por tarjeta.
- **Modal** (overlay propio) con formulario: cantidad y método de pago.
- Estilos base en `style.css` + utilidades de Bootstrap.
- Diseño **responsive**.

## 🗂️ Estructura del proyecto
```
/ (raíz)
├─ index.html
├─ style.css
├─ index.js
├─ components/
│  ├─ card/
│  │  └─ productCards.js
│  └─ modalFunctions.js
└─ data/
   └─ products.json
```

## 🔧 Tecnologías
- HTML5, CSS3, JavaScript (ES Modules).
- Bootstrap 5.3.x (CDN) para grid/utilidades y `collapse`.

## ▶️ Ejecución local (evitar CORS)
Este proyecto usa `fetch()` para cargar el JSON, así que no abras `index.html` con `file://`. Sirve la carpeta con un servidor local:

**Python 3**
```bash
python3 -m http.server 5173
# Visita http://localhost:5173
```

**VS Code**
- Extensión *Live Server* → *Go Live*.

## 🧩 Cómo funciona
- **index.js**  
  - Espera a `DOMContentLoaded`, hace `fetch` de `data/products.json` y renderiza el listado en `#products`.
  - Por cada producto llama a `createCard(producto, onBuy)` y añade la tarjeta al `DocumentFragment` antes de insertarlo en el DOM.

- **components/card/productCards.js**  
  - `createCard(producto, onBuy)` construye el `<article>` con: imagen, datos (título, descripción, precio) y controles.
  - El botón **Ver más** usa `data-bs-toggle="collapse"` y `data-bs-target="#collapse-{id}"` para desplegar características.
  - `createCollapse(...)` monta el cuerpo colapsable con la lista de características.

- **components/modalFunctions.js**  
  - `getProductToModal(producto)` clona la card al modal, asegura **IDs únicos** para su `collapse`, oculta el botón **Comprar** y muestra el overlay.
  - `setModalListeners()` registra los listeners de cierre (botón cancelar y clic fuera) y el `submit` del formulario con validaciones.

- **style.css**  
  - Estilos de la card, overlay `#modal` y caja `#modal-content`.

- **data/products.json**  
  - Array de productos que alimenta el render.

## ♻️ Reutilización del componente
Añade objetos en `data/products.json` con esta forma (ejemplo):
```json
{
  "id": "p-1001",
  "name": "Ejemplo de producto",
  "description": "Descripción corta…",
  "price": 19.99,
  "img": { "src": "https://…", "alt": "Imagen del producto" },
  "characteristics": ["Detalle 1", "Detalle 2"]
}
```
El `index.js` recorrerá el array y generará automáticamente las tarjetas.

