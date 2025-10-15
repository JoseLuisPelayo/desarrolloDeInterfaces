//Componente con las funciones que crean las cards de los productos
import productCards, { createCard } from "./components/card/productCards.js";

document.addEventListener('DOMContentLoaded', async () => {

  //Traigo los productos del json mediante un fetch por que importando archivo no me funcionaba 
  const productsContainer = document.querySelector('#products');
  let products = await fetch('./data/products.json', { cache: "no-store" });
  products = await products.json();

  //Cojo los elementos ue necesito para setear la apertura y cierre de los modales
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const cancelButton = document.getElementById('cancel-button');

  // Cierro el modal y elimino el primer hijo que habre introducido al abrirlo
  // Elimino el feedback y el valor de los inputs
  cancelButton.addEventListener('click', () => {
    modal.style.display = modal.style.display !== 'block' ? 'block' : 'none';
    modalContent.removeChild(modalContent.firstChild);
    clearForm();
  });

  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = 'none';
      modalContent.removeChild(modalContent.firstChild);
      clearForm();
    }
  })


  // Creo un fragmento para no recargar el DOM
  const fragment = document.createDocumentFragment();

  products.forEach((e) => {
    const card = productCards.createCard(e, () => {
      /* Esto es la función que se ejecutara cuando le des al boton de comprar de las tarjetas de producto
      e es el objeto con el que se crea la card
      Clono el nodo para poder borrarlo posteriormente sin borrar el original que seguira mostrandose, 
      si no hacemos esto y simplemente le pasamos el nodo se borrara tambien el que esta fuera del modal,
      ya que hara referencia directamente a el. */
      const modalCard = document.getElementById(e.id).cloneNode(true);

      modal.style.display = modal.style.display !== 'block' ? 'block' : 'none';
      modalCard.classList.remove("col-xl-4", "col-lg-6");
      modalCard.classList.add('mb-5');
      modalContent.insertBefore(modalCard, modalContent.firstChild);
    });

    fragment.appendChild(card);
  });

  productsContainer.appendChild(fragment);


  //VALIDACION DEL FORMULARIO
  const quantityInput = document.querySelector('#quantity');
  const payMethod = document.querySelector('#pay-method');

  document.querySelector('form').addEventListener('submit', (e) => {

    const err = new Map();

    if (!parseInt(quantityInput.value) > 0 || quantityInput.value == '') {
      err.set("quantity-err", "Debe introducir una cantidad valida");
    } else {
      document.getElementById('quantity-err').innerText = '';
      document.getElementById('quantity-err').style.display = 'none';
    }

    if (payMethod.value == '') {
      err.set('pay-err', 'Debe seleccionar un método de pago');
    } else {
      document.getElementById('pay-err').innerText = '';
      document.getElementById('pay-err').style.display = 'none';
    }

    if (err.size) {
      e.preventDefault();
      err.keys().forEach(e => {
        document.getElementById(e).innerText = err.get(e);
        document.getElementById(e).style.display = 'block';
      })
    }

  })

  function clearForm() {
    document.getElementById('quantity-err').innerText = '';
    document.getElementById('quantity-err').style.display = 'none';
    document.getElementById('pay-err').innerText = '';
    document.getElementById('pay-err').style.display = 'none';
    payMethod.value = '';
    quantityInput.value = '';
  }
});




