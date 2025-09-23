document.addEventListener("DOMContentLoaded", () => {

    const btn = document.querySelector('.btn');
    let counter = 0;

    btn.addEventListener('click', () => {
        if (counter >= buttonText.length) {
            counter = 0;
            btn.innerHTML = 'CLIKEAME';
        } else {
            btn.innerText = buttonText[counter];
            counter++;
        }
    });
})

const buttonText = ['Este', 'boton', 'va', 'cambiando', 'lo', 'que', 'pone'];