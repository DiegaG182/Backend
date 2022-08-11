import express from 'express'
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import __dirname from './utils.js'

//--------------------------------------------
// init server

const app = express()


const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))

//--------------------------------------------
// server config

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

//--------------------------------------------
// Assign routes to each routers
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)



//--------------------------------------------

