//Cojo los elementos ue necesito para setear la apertura y cierre de los modales
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const cancelButton = document.getElementById('cancel-button');

export function getProductToModal(ele) {
    /* Esto es la función que se ejecutara cuando le des al boton de comprar de las tarjetas de producto
      Clono el nodo con el id que le paso para poder borrarlo posteriormente sin borrar el original que seguira mostrandose, 
      si no hacemos esto y simplemente le pasamos el nodo se borrara tambien el que esta fuera del modal,
      ya que hara referencia directamente a el.
      */
    const modalCard = document.getElementById(ele.id).cloneNode(true);

    //En estas líneas lo que hago es independizar los collapses para que no se abra y se cierre tambien el que esta en el
    // contenerdor principal
    modalCard.id = modalCard.id.concat('-modal');
    const modalCardMoreBtn = modalCard.querySelector('.card__controls__more');

    modalCardMoreBtn.setAttribute('data-bs-target', "#collapse-".concat(modalCard.id));
    modalCardMoreBtn.setAttribute('aria-controls', 'collapse-'.concat(modalCard.id));
    modalCardMoreBtn.classList.replace('btn-outline-secondary', 'btn-secondary');

    modalCard.querySelector('.collapse').id += '-modal';
    //Y oculto el boton decomprar de la trageta
    modalCard.querySelector('.card__controls__buy').style.display = 'none';

    modal.style.display = document.getElementById('modal').style.display !== 'block' ? 'block' : 'none';
    modalCard.classList.remove("col-xl-4", "col-lg-6");
    modalCard.classList.add('mb-5');
    modalContent.insertBefore(modalCard, document.getElementById('modal-content').firstChild);
}

// Cierro el modal y elimino el primer hijo que habre introducido al abrirlo
// Elimino el feedback y el valor de los inputs
function closeModal() {
    modal.style.display = modal.style.display !== 'block' ? 'block' : 'none';
    modalContent.removeChild(modalContent.firstChild);
    clearForm();
}

//VALIDACION DEL FORMULARIO
function validateForm(evnt) {
    const quantityInput = document.querySelector('#quantity');
    const payMethod = document.querySelector('#pay-method');
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
        evnt.preventDefault();
        err.keys().forEach(e => {
            document.getElementById(e).innerText = err.get(e);
            document.getElementById(e).style.display = 'block';
        })
    }
}

//Esta función limpia el formulario del modal
function clearForm() {
    document.getElementById('quantity-err').innerText = '';
    document.getElementById('quantity-err').style.display = 'none';
    document.getElementById('pay-err').innerText = '';
    document.getElementById('pay-err').style.display = 'none';
    document.querySelector('#quantity').value = '';
    document.querySelector('#pay-method').value = '';
}

//Setea los listeners del modal
export function setModalListeners() {
    cancelButton.addEventListener('click', () => {
        // modal.style.display = modal.style.display !== 'block' ? 'block' : 'none';
        // modalContent.removeChild(modalContent.firstChild);
        // clearForm();
        closeModal();
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            // modal.style.display = 'none';
            // modalContent.removeChild(modalContent.firstChild);
            // clearForm();
            closeModal();
        }
    })

    document.querySelector('form').addEventListener('submit', (e) => { validateForm(e) })
}

export default {
    getProductToModal,
    setModalListeners
}