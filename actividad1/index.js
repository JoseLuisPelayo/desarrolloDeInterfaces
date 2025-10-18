//Componente con las funciones que crean las cards de los productos
import { createCard } from "./components/card/productCards.js";
import { getProductToModal, setModalListeners } from "./components/modalFunctions.js";

document.addEventListener('DOMContentLoaded', async () => {

  //Traigo los productos del json mediante un fetch por que importando archivo no me funcionaba 
  const productsContainer = document.querySelector('#products');
  let products = await fetch('./data/products.json', { cache: "no-store" });
  products = await products.json();

  setModalListeners();

  // Creo un fragmento para no recargar el DOM
  const fragment = document.createDocumentFragment();

  products.forEach((e) => {
    const card = createCard(e, () => {getProductToModal(e);});

    fragment.appendChild(card);
  });

  //Despues de cargar todos los elementos en el fragmento lo cargo al dom
  productsContainer.appendChild(fragment);
});