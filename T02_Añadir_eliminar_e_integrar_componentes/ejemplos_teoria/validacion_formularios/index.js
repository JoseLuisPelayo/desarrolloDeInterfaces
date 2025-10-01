const regex = {
    user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    pass: /^.{4,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/ // 7 a 14 numeros.
}

const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const validateForm = (e) => {
    const input = e.target
    console.log(regex[input.id].test(input.value))
    if (regex[input.id].test(input.value)) {
        input.classList.add('border-2')
        input.classList.add('border-success')
        input.classList.remove('border-danger')

    } else {
        input.classList.add('border-2')
        input.classList.add('border-danger')
        input.classList.remove('border-success')
    }

};

inputs.forEach((ele) => {
    ele.addEventListener('keyup', validateForm)
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
});



