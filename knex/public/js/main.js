const socket = io.connect();

//------------------------------------------------------------------------------------

socket.on('productos', async productos => {
    const promesaHtml =  await makeHtmlTable(productos)
    const html = promesaHtml
    document.getElementById('productos').innerHTML = html;
});

function addProduct(e) {
    
    const product = {
        title: document.getElementById("nombre").value,
        price:  parseFloat(document.getElementById("precio").value),
        thumbnail:  document.getElementById("foto").value
    };
    socket.emit('new-product', product);
    document.getElementById("formAgregarProducto").reset()
    return false;
}

function makeHtmlTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ 
                productos: productos,
                hayProductos: productos.length
            })
            return html
        })
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')


const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    
    
    var dt = new Date();

    const dateTime =  `${
    dt.getDate().toString().padStart(2, '0')}/${
    (dt.getMonth()+1).toString().padStart(2, '0')}/${
    dt.getFullYear().toString().padStart(4, '0')} ${
    dt.getHours().toString().padStart(2, '0')}:${
    dt.getMinutes().toString().padStart(2, '0')}:${
    dt.getSeconds().toString().padStart(2, '0')}`
;
    const message = {
        userName: inputUsername.value,
        date:  dateTime,
        message: inputMensaje.value
    };
    socket.emit('new-message', message);
    return false;

});

socket.on('mensajes', mensajes => {
    makeHtmlList(mensajes)
})

function makeHtmlList(messages) {
    const html = messages.map((message, index) => {
        return (`<div><strong style="color:blue;">${message.userName}</strong> <span style="color:brown;">[${message.date}]</span> : <em style="color:green;">${message.message}</em></div>`)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}
