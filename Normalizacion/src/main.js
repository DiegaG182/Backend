
import express from 'express';
import __dirname from "./utils.js";
import {Server} from 'socket.io';
//import * as HttpServer from 'http';
import {optionsSql, optionsSqlite3} from '../sql/options.js'
import faker from 'faker';
import config from './config.js';
import mongoose from 'mongoose';

/* const mariaDB = knex(options);


import ContenedorProductos from '../contenedores/productosDB.js'
import ContenedorMensajes from '../contenedores/mensajesDB.js'
 */
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


//const productosApi = new ContenedorProductos('productos.json')
//const mensajesApi = new ContenedorMensajes('mensajes.json')

//const mensajesApi = new ContenedorMensajes(optionsSqlite3,'messages')
//const productosApi = new ContenedorProductos(optionsSql,'products')
 
import ContenedorMongoDB from '../contenedores/ContenedorMongo.js';
const mensajesApi = new ContenedorMongoDB('messages',config.mongoDB.schema.messages)
const productosApi = new ContenedorMongoDB('products',config.mongoDB.schema.products)


//--------------------------------------------
// configuro el socket

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

//configuro faker
faker.locale = "es";

const {commerce,image} = faker
app.get('/api/productos-test', (req, res) => {
    let fakeProducts = [];
    for (let i = 0; i < 5; i++) {
        fakeProducts.push({
            title: commerce.productName(),
            price: commerce.price(),
            thumbnail: image.imageUrl()
        });
        
    }

    res.send(fakeProducts);
});


io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    // carga inicial de productos
    const productos = await productosApi.getAll().then(productos => productos)
         
    socket.emit('productos', productos);
    
    // actualizacion de productos
    socket.on("new-product",async product =>{
        await productosApi.save(product)

        const allproductos = JSON.parse(JSON.stringify(await productosApi.getAll().then(productos => productos)))
        io.sockets.emit("productos", allproductos)
    })

    // carga inicial de mensajes
    const mensajes = await mensajesApi.getAll().then(mensajes => mensajes)
    
    /* socket.emit('mensajes', mensajes); */
    
    // actualizacion de mensajes
    socket.on("new-message",async message =>{
        console.log(message)
        
        const result = await mensajesApi.save(message)
        console.log(result)
        const mensajes = JSON.parse(JSON.stringify(await mensajesApi.getAll().then(mensajes => mensajes)))
        
        /* io.sockets.emit("mensajes", mensajes) */
    
    })
}); 

 
//--------------------------------------------
