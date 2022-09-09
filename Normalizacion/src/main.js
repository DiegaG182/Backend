
import express from 'express';
import __dirname from "./utils.js";
import {Server} from 'socket.io';
//import * as HttpServer from 'http';
import {optionsSql, optionsSqlite3} from '../sql/options.js'
import faker from 'faker';
import config from './config.js';
import mongoose from 'mongoose';
import {normalize,schema} from 'normalizr'

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
import { json } from 'stream/consumers';
//probe declarar aca tambien tanto el schema como el model, xq  no me toma el populate
/* const messagesSchema = new mongoose.Schema(config.mongoDB.schema.message, { timestamps: true })
const authorsSchema = new mongoose.Schema(config.mongoDB.schema.author, { timestamps: true })
const messages = mongoose.model('messages',messagesSchema)
const authors = mongoose.model('authors',authorsSchema)
 */
const chatApi = new ContenedorMongoDB('messages',config.mongoDB.schema.message);
const authorApi = new ContenedorMongoDB('authors',config.mongoDB.schema.author);
const productosApi = new ContenedorMongoDB('products',config.mongoDB.schema.products);


//--------------------------------------------
// configuro el socket

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

//configuro faker

app.get('/api/productos-test', (req, res) => {
    faker.locale = "es";
    const {commerce,image} = faker;
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
    //const mensajes = await mensajesApi.getAll().then(mensajes => mensajes)
    
    /* socket.emit('mensajes', mensajes); */
    
    // actualizacion de mensajes
    socket.on("new-message",async message =>{
        

    /*     const findAuthor = await authorApi.getByMail(message.author.mail)
          
        if (findAuthor == 0){
            findAuthor = await authorApi.save(message.author)
        }

        const chat = await chatApi.save({author: findAuthor._id, message: message.message})
         */
        let authorModel =  authorApi.collection
        //console.log(schemaAuthor)
        //let populate = await chatApi.collection.findById({_id: "631a8fa29ea5d7bdaa3d5e4b"}).populate("authors")
        let allChats = await chatApi.collection.find({}).populate("authorModel")
        console.log(allChats)
          
        const authorN = new schema.Entity('authors')
        const messageN = new schema.Entity('messages',{
            author:authorN
        })
        const normalizedData = normalize(allChats,[messageN])
        console.log(JSON.stringify(normalizedData, null, '/t'))  

        //********************************************
        /* no me toma el modelo, ni importandolo como hice aca, ni definiendolo arriba, como esta comentado, no se que hacer
        
        C:\coderhouse\backend\2proyecto\Normalizacion\node_modules\mongoose\lib\helpers\populate\getModelsMapForPopulate.js:48
    return new StrictPopulate(options._fullPath || options.path);
           ^

StrictPopulateError: Cannot populate path `authorModel` because it is not in your schema. Set the `strictPopulate` option to false to override.
    at getModelsMapForPopulate (C:\coderhouse\backend\2proyecto\Normalizacion\node_modules\mongoose\lib\helpers\populate\getModelsMapForPopulate.js:48:12)
    at populate (C:\coderhouse\backend\2proyecto\Normalizacion\node_modules\mongoose\lib\model.js:4637:21)
    at _populate (C:\coderhouse\backend\2proyecto\Normalizacion\node_modules\mongoose\lib\model.js:4597:5)
    at C:\coderhouse\backend\2proyecto\Normalizacion\node_modules\mongoose\lib\model.js:4574:5
    at promiseOrCallback (C:\coderhouse\backend\2proyecto\Normalizacion\node_modules\mongoose\lib\helpers\promiseOrCallback.js:11:14)
    at Mongoose._promiseOrCallback (C:\coderhouse\backend\2proyecto\Normalizacion\node_modules\mongoose\lib\index.js:1233:10)
    at Function.Model.populate (C:\coderhouse\backend\2proyecto\Normalizacion\node_modules\mongoose\lib\model.js:4572:23)
    at C:\coderhouse\backend\2proyecto\Normalizacion\node_modules\mongoose\lib\query.js:2289:19
    at C:\coderhouse\backend\2proyecto\Normalizacion\node_modules\mongoose\lib\helpers\query\completeMany.js:37:32      
    at processTicksAndRejections (node:internal/process/task_queues:78:11) {
  path: 'authorModel'
}




        */
        //console.log(result)
        //const mensajes = JSON.parse(JSON.stringify(await mensajesApi.getAll().then(mensajes => mensajes)))
        
        /* io.sockets.emit("mensajes", mensajes) */
    
    })
}); 

 
//--------------------------------------------
