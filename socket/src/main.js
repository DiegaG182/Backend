
import express from 'express';
import __dirname from "./utils.js";
import {Server} from 'socket.io';
//import * as HttpServer from 'http';


import ContenedorProductos from '../contenedores/productos.js'
import ContenedorMensajes from '../contenedores/mensajes.js'

//--------------------------------------------
// instancio servidor, socket y api

const app = express()

// inicio el servidor

const PORT = 8080
const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))

const io = new Server(connectedServer)

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('../public'));


const productosApi = new ContenedorProductos('productos.json')
const mensajesApi = new ContenedorMensajes('mensajes.json')

//--------------------------------------------
// configuro el socket

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});


io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    // carga inicial de productos
    const productos = await productosApi.getAll().then(productos => productos)
    socket.emit('productos', productos);
    // actualizacion de productos
    socket.on("new-product",async product =>{
        await productosApi.save(product)
        const productos = await productosApi.getAll().then(productos => productos)
        io.sockets.emit("productos", productos)
    })

    // carga inicial de mensajes
    const mensajes = await mensajesApi.getAll().then(mensajes => mensajes)
    socket.emit('mensajes', mensajes);
    
    // actualizacion de mensajes
    socket.on("new-message",async message =>{
        await mensajesApi.save(message)
        const mensajes = await mensajesApi.getAll().then(mensajes => mensajes)
        io.sockets.emit("mensajes", mensajes)
    })
});


//--------------------------------------------
