import { Router } from "express";
import Contenedor from "../api/Contenedor.js";

const router = Router();

const contenedor = new Contenedor('../src/productos.json')

router.get('/', async (req,res) => {
    
    let prods =  await contenedor.getAll().then(x=>x)
    res.send(prods)
})

router.get('/:id', async (req,res) => {
    const id = parseInt(req.params.id) 
    let prods =  await contenedor.getById(id).then(x=>x)
    res.send(prods)
})

router.post('/', async (req,res) => {
    
    const product = req.body 
    let ids =  await contenedor.save(product).then(id=>id);
    res.send({...product, id: ids} )
})

router.put('/:id', async (req,res) => {
    const id = parseInt(req.params.id) 
    const newProduct = req.body
    await contenedor.updateById(id,newProduct)
    res.send();
})

router.delete('/:id', async (req,res) => {
    const id = parseInt(req.params.id) 
    await contenedor.deleteById(id)
    res.send();
})

export default router;