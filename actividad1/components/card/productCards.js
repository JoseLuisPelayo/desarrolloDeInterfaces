/*  
  Crea una card de producto completa (<article>) con imagen, contenido (título, descripción, precio),
  controles (Comprar / Ver más) y un bloque colapsable de características.

  Parámetros:
    - obj -> (object) Objeto con la información de la card. Estructura esperada:
        {
          id: ID único de la card,
          name: Título del producto,
          description: Descripción del producto,
          price: Precio a mostrar,
          img: Datos de la imagen -> { src: string, alt: string },
          characteristics: string[]Lista de características para el collapse,
        }
    - setBuyButtonFunction -> (func) Funcion callback para el boton de comprar

  Notas:
    - El botón "Ver más" utiliza los atributos Bootstrap data-bs-toggle="collapse" y data-bs-target="#collapse-{id}".
    - Se añaden atributos ARIA para accesibilidad (aria-controls, aria-expanded).
    - La altura del contenedor de imagen se fija en "25rem".
    - Este componente asume que Bootstrap (CSS + JS) está disponible en la página.

  Devuelve:
    - El nodo <article> completamente construido y listo para insertarse en el DOM.
*/
export function createCard(obj, setBuyButtonFunction) {
    const cardDataContainer = document.createElement('div'); 
    cardDataContainer.classList.add("col-md-8", "text-bg-dark", "rounded-end", "card__content");
    cardDataContainer.append(
        createCardData(obj.name, obj.description, obj.price),
        createCardControls(obj.id, setBuyButtonFunction)
    );

    const card = document.createElement('div');
    card.classList.add("row", "g-0");
    card.append(
        createCardImg(obj.img.src ?? "", obj.img.alt ?? ""),
        cardDataContainer
    );

    const cardContainer = document.createElement('article');
    cardContainer.classList.add("card", "col-xl-4", "col-lg-6", "col-12", "p-0");
    cardContainer.id = String(obj.id);

    cardContainer.append(
        card,
        createCollapse("Características", obj.characteristics, `collapse-${obj.id}`)
    );

    return cardContainer;
}

/*  
  Genera el contenedor de imagen para una tarjeta (card) y su elemento <img> interno.

  Parámetros:
    - src -> URL de la imagen a mostrar (atributo "src" del <img>).
    - alt -> Texto alternativo descriptivo para la imagen (atributo "alt" del <img>).

  Devuelve:
    - El nodo <div> con la imagen lista para insertarse en el DOM.
*/
function createCardImg(src, alt) {
  const divImgContainer = document.createElement('div');
  divImgContainer.style.height = "25rem";
  divImgContainer.style.flexGrow = 1;
  divImgContainer.classList.add("col-md-4", "d-flex", "justify-content-center");

  const img = document.createElement('img');
  img.style.objectFit = 'cover';
  img.setAttribute('src', src);
  img.setAttribute('alt', alt);
  img.classList.add("img-fluid", "mx-auto", "rounded-start");

  divImgContainer.appendChild(img);
  return divImgContainer;
}

/*  
  Genera el bloque de datos de una tarjeta (card) con título, descripción y precio.

  Parámetros:
    - title       -> Título que se mostrará en el encabezado (h3).
    - description -> Texto descriptivo del producto/servicio.
    - price       -> Importe mostrado como "Precio: {price} €".

  Devuelve:
    - El contenedor con los nodos ya creados.
*/
function createCardData(title, description, price) {
  const divData = document.createElement('div');
  divData.classList.add("card__data", "card-body");

  const dataTitle = document.createElement('h3');
  dataTitle.innerText = title;
  dataTitle.classList.add("card__data__title", "card-title");

  const dataDescription = document.createElement('p');
  dataDescription.innerText = description;
  dataDescription.classList.add("card__data__description", "card-text");

  const dataPrice = document.createElement('p');
  dataPrice.innerText = `Precio: ${price} €`;
  dataPrice.classList.add("card__data__price", "card-text");

  divData.append(dataTitle, dataDescription, dataPrice);
  return divData;
}


/*   
  Genera los controles de la card:
    - Botón "Comprar" que puede enlazarse a la lógica de compra.
   
    - Botón "Ver más" que despliega un collapse (Bootstrap).
        Atributos Bootstrap usados:
          - data-bs-toggle="collapse"  -> Alterna el estado del collapse.
          - data-bs-target="#collapse-{id}"     -> Referencia al id del nodo objetivo del collapse.

  Parámetros:
    - collapseId -> Selector CSS del objetivo del collapse (ej. "#collapse-123").
    - setBuyButtonFunction -> (func) Funcion callback para el boton de comprar

  Devuelve:
    - Contenedor con los botones.
*/
function createCardControls(collapseId, setBuyButtonFunction) {
  const divControlsContainer = document.createElement('div');
  divControlsContainer.classList.add("card__controls", "d-flex", "justify-content-center", "gap-3", "mb-3");

  const buyButton = document.createElement('button');
  buyButton.type = "button";
  buyButton.innerText = "Comprar";
  buyButton.classList.add("card__controls__buy", "btn", "btn-primary");
  buyButton.addEventListener('click', () => {
    setBuyButtonFunction();
  });

  const moreButton = document.createElement('button');
  moreButton.type = "button";
  moreButton.innerText = "Ver más";
  moreButton.setAttribute('data-bs-toggle', 'collapse');
  moreButton.setAttribute('data-bs-target', `#collapse-${collapseId}`);
  moreButton.setAttribute('aria-expanded', 'false');
  moreButton.setAttribute('aria-controls', `#collapse-${collapseId}`);
  moreButton.classList.add("card__controls__more", "btn", "btn-outline-secondary");

  divControlsContainer.append(buyButton, moreButton);
  return divControlsContainer;
}


/*   
  Genera un collapse compuesto de un título (h5) y una lista desordenada de características.

    - title              -> Título que tendrá la lista del componente.
    - characteristicsList-> Array de elementos; cada entrada genera un <li>.
    - collapseId         -> ID del nodo raíz del collapse.

  Notas:
    - Este bloque se muestra/oculta con el botón "Ver más" que apunte a "#{collapseId}".
    - Si la lista llega vacía, se renderiza un <ul> vacío para mantener consistencia de layout.

  Devuelve:
    - El nodo raíz del collapse listo para insertarse en el DOM.
*/
function createCollapse(title, characteristicsList, collapseId) {
  const divCollapseContainer = document.createElement('div');
  divCollapseContainer.id = collapseId;
  divCollapseContainer.classList.add("collapse");
  divCollapseContainer.setAttribute("data-bs-parent", "#products");

  const divCollapseBody = document.createElement('div');
  divCollapseBody.classList.add("card", "card-body", "text-bg-dark");

  const listTitle = document.createElement('h5');
  listTitle.innerText = title;

  const list = document.createElement('ul');
  (characteristicsList || []).forEach((ele) => {
    const li = document.createElement('li');
    li.innerText = ele;
    list.appendChild(li);
  });

  divCollapseBody.append(listTitle, list);
  divCollapseContainer.append(divCollapseBody);

  return divCollapseContainer;
}

export default {
    createCard
}