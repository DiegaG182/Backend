import { Router } from "express"
import express from 'express'
import {ProductsDao as productsApi} from '../daos/index.js'

// products router config
const productsRouter = new Router()
productsRouter.use(express.json())
productsRouter.use(express.urlencoded({ extended: true }))


// Autenticacion
const isAdmin = true;
const isAuthenticated = function (req,res,next) {
    
    if (!isAdmin ) {
        return res.status(401).send({
            "Error": -1,
            "Description": `Url: ${req.baseUrl}, Method: ${req.method}, Not Authorized `,
            "status": 401
        })
    } 
    next();
}

//Get all Products
productsRouter.get('/',isAuthenticated, async (req,res,next) => {
   
    let allProducts =  await productsApi.getAll()
                        .then(allProducts=>{return res.send(allProducts)} )
                        .catch(err => {
                            return res.status(400).send({  Description: 'No se pudieron recuperar elementos.',
                                                    Error: `${err}`})
                        });
    
})

//Get Product By Id
productsRouter.get('/:pId', isAuthenticated, async (req,res) => {
    const id = req.params.pId; 
    let selectedProduct =  await productsApi.getById(id)
                            .then(product=>{return res.send(product.object);})
                            .catch(err => {
                                return res.status(400).send({  Description: 'No se encontro el producto buscado.',
                                                        Error: `${err}`})
                            });        
    
})

//Add product
productsRouter.post('/', isAuthenticated, async (req,res) => {

    const newProduct = req.body; 
    const idProd = await productsApi.save(newProduct)
                .then(idNewProduct => {return res.send({id: idNewProduct})})
                .catch(err => {
                   
                    return res.status(400).send({  Description: 'No se guardó el producto.',
                    Error: `${err}`})
                                      
                });

})

//Update Product By ID
productsRouter.put('/:pId', isAuthenticated, async (req,res) => {
    const id = req.params.pId; 
    const modifyProduct = req.body;
    await productsApi.updateById(id,modifyProduct)
        .catch(err => {
            return res.status(400).send({  Description: 'No se pudo actualizar el producto.',
                                    Error: `${err}`})
    }) 
    return res.send();
})

productsRouter.delete('/:pId', isAuthenticated, async (req,res) => {
    const id = req.params.pId; 
    console.log(id)
    await productsApi.deleteById(id)
        .catch(err => {
            return res.status(400).send({  Description: 'No se pudo borrar el producto.',
                                    Error: `${err}`})
    }) ;
    return res.send();
})


export default productsRouter;