import express from "express";
import __dirname from "./utils.js";
//Clase Productos
import Contenedor from "../api/productos.js";

const productosApi = new Contenedor()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


app.set("view engine", "ejs");
app.set("views", "./views");

//POST - Guarda Nuevo Producto
app.post('/productos', (req, res) => {
    const producto = req.body
    productosApi.save(producto)
    res.redirect('/')
})

//Recupera los productos para renderizarlos.
app.get('/productos', (req, res) => {
    const prods = productosApi.getAll()

    res.render("vista", {
        productos: prods,
        hayProductos: prods.length
    });
});

//Levantar el servidor
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))