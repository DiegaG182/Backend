import expres from "express";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";

const app = expres();
app.use(expres.urlencoded({ extended: true }))

//static
app.use(expres.static('public'));
app.use(expres.json());
 

//routes
app.use('/api/productos', productsRouter)

// inicio el servidor
const PORT = 8080;
const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})