import Router from 'express'
import express from 'express'
import {ProductsDao as productsApi, CartsDao as cartsApi} from '../daos/index.js'


//--------------------------------------------
// carts router config

const cartsRouter = new Router()
cartsRouter.use(express.json())
cartsRouter.use(express.urlencoded({ extended: true }))


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
    await cartsApi.deleteById(idC)
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
        const selectedCart = await cartsApi.getById(idC)
        const productsOfCart = await Promise.all(
             selectedCart.cart.products.map(async (product) => {
                 let p = await productsApi.getById(product.product)
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
        await productsApi.getById(productToAddId);
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