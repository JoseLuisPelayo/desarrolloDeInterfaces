document.addEventListener("DOMContentLoaded", () => {

    const btn = document.querySelector('.submit');
    const name = document.querySelector('.name');

    name.addEventListener('input', () => {
        if (name.value.trim() !== '') {
            btn.disabled = false;
        } else {
            btn.disabled = true;
        }
    });
})
