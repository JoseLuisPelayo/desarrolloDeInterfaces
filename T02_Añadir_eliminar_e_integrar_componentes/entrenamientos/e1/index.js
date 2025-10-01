document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('list');
    const text = document.getElementById('new-note');
    const addBtn = document.getElementById('add-btn');
    const remBtn = document.getElementById('remove-btn');
    const feedBack = document.querySelector('.valid p');

    addBtn.addEventListener('click', () => {
        let newNote = text.value;

        if (newNote.trim() !== '' && newNote.trim() !== null) {
            list.appendChild(createLi(newNote));
            text.value = '';
            feedBack.innerText = 'Añadido correctamente';
        } else {
            feedBack.innerText = 'La nota no puede estar vacia'
        }
    })

    remBtn.addEventListener('click', () => {
        try {
            list.removeChild(list.lastChild);
            feedBack.innerText = "Nota eliminada correctamente";

        } catch (error) {
            feedBack.innerText = "No hay notas para eliminar";
        }
    })

})

function createLi(content) {
    let element = document.createElement('li');
    element.innerText = content;
    element.classList.add('list-group-item');
    return element
}

