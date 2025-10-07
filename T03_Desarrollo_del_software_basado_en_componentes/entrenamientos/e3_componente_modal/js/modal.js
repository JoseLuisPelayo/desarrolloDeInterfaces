document.addEventListener('DOMContentLoaded', () => {

    const imgs = document.querySelectorAll('#galeria img');
    const modalTitle = document.querySelector('.modal__content__title');
    const modalClose = document.querySelector('.modal__content__close');
    const modal = document.querySelector('.modal');
    const img = document.querySelector('.modal__content__img');

    imgs.forEach(element => {
        element.addEventListener('click', (e) => {
            modalTitle.innerText = 'Foto Guapa';
            img.setAttribute('src', e.target.getAttribute('src'));
            openModal(modal);
    });
})


    modalClose.addEventListener('click', () => closeModal(modal));
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModal(e.target)
        }
    })


})

function openModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}