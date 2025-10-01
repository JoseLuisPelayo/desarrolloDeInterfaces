document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('card').appendChild(createButton(button, callbackButton))
})



function createButton(butonJson, callback) {
    let btn = document.createElement('button');
    btn.id = butonJson.id;
    btn.name = butonJson.name;
    btn.innerText = butonJson.text;

    butonJson.class.forEach(element => {
        btn.classList.add(element);
    });

    btn.addEventListener('click', callback)

    return btn;
}


const button = {
    'text': "Clikeame",
    'id': 'example',
    'name': 'example',
    'class': ['btn', 'btn-primary', 'fw-bolder', 'fs-4']
}

function callbackButton() {
    console.log("hola soy tu boton personalizado");
    
}