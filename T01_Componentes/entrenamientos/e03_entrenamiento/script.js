document.addEventListener("DOMContentLoaded", () => {

    const btn = document.querySelector('.mostrar-btn');
    const text = document.querySelector('.text');

    btn.addEventListener('click', () => {
        text.classList.toggle('hidden')
    });
})