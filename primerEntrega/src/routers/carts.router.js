import Router from 'express'
import express from 'express'



//--------------------------------------------
// carts router config

const cartsRouter = new Router()
cartsRouter.use(express.json())
cartsRouter.use(express.urlencoded({ extended: true }))

//Import & Init Products API
import ProductsApi from '../api/products.api.js'
const productsApi = new ProductsApi('../src/products.json')
//Import & Init Carts API
import CartsApi from '../api/Carts.api.js'
const cartsApi = new CartsApi('../src/carts.json')


//A. Post - Crea carrito vacio
cartsRouter.post('/',async (req,res) => {
    
    await cartsApi.createCart()
                .then(cId=>res.status(201).send({Product_Id: cId}))
                .catch(err => {
                    res.status(400).send({  Description: 'No se pudo crear el carrito.',
                                            Error: `${err}`})
                });
    
})

//B. Delete - elimina un carrito
cartsRouter.delete('/:cId', async (req,res) => {
    let idC = req.params.cId
    await cartsApi.deleteCartById(idC)
            .catch(err => {
                res.status(400).send({  Description: 'No se pudo eliminar el carrito.',
                                        Error: `${err}`})
    });
    res.status(201).send()
})

//C. Get - Lista productos de un carrito
cartsRouter.get('/:cId/products', async (req,res) => {
    try{
        const idC = req.params.cId
        const selectedCart = await cartsApi.getCartById(idC)
        const productsOfCart = await Promise.all(
             selectedCart.cart.products.map(async (product) => {
                 let p = await productsApi.getProductById(product.product)
                 return(p)
             })
        )
        res.send(productsOfCart)         
    }catch(err) {
        res.status(400).send({  Description: 'No se pudo listar el carrito.',
                                Error: `${err}`})
    };
    
})

//D. Post - Incorpora un producto al carrito por su ID
cartsRouter.post('/:cId/products', async (req,res) => {
    const productToAddId = req.body.product_Id;
    const cartId = req.params.cId;
    try{
        await productsApi.getProductById(productToAddId);
        await cartsApi.addProductToCart(cartId,productToAddId);

        res.status(201).send()
    }catch(err){
        res.status(400).send({  Description: 'No se pudo agregar producto al carrito.',
                                Error: `${err}`})
    } 
})

//E. Delete - borra un producto por Id del carrito especifico por Id
cartsRouter.delete('/:cId/products/:pId', async (req,res) => {
    const productToDelete = parseInt(req.params.pId);
    const cartId = req.params.cId;
    try{   
        await cartsApi.deleteProductOfCart(cartId,productToDelete);
        res.send();
    }catch(err){
            res.status(400).send({    Description: 'No se pudo eliminar el producto del carrito.',
                                      Error: `${err}`})
    }
})




export default cartsRouter;