import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

class Carts {
    constructor(fileName){
        this.route = fileName;
        this.id = 0;
    }

    async createCart(){
        
        let allCarts = await this.getAllCarts();
        let idC = uuidv4();
        const timestamp = moment().format()
        const newCart = {id: idC, timestamp:timestamp, products: []} 
        allCarts.push(newCart)               
        try{
            await fs.writeFile(`${this.route}`,JSON.stringify(allCarts, null, 2));
            
            return idC;
        }catch(err){throw new Error(`Al procesar guardado del Carrito: ${err}`);}
    }
    
    async deleteCartById(id){
        const allCarts = await this.getAllCarts()
        const cartIndex = allCarts.findIndex(cart => cart.id == id)
        if (cartIndex == -1) {
            throw new Error(`No se encontró el id ${id}`)
        }
        
        allCarts.splice(cartIndex, 1)
        try {
            await fs.writeFile(this.route, JSON.stringify(allCarts, null, 2))
        }catch (error) {
            throw new Error(`Al borrar carrito: ${error}`)
        }
    }

    async getAllCarts() {
        try{
        const allCarts = await fs.readFile(`${this.route}`,'utf-8');
        return JSON.parse(allCarts)   
        }catch(err){
            //console.log(`Al leer los carritos: ${err}`)
            return [];
        }
    }

    async getCartById(id) {
        try{
            const allCarts = await this.getAllCarts()
            const index = allCarts.findIndex(cart => cart.id == id)
            if (index == -1) {
                throw new Error(`No se encontró el id ${id}`)
            }
    
        return {cart: allCarts[index], cartIndex: index}
        }catch(err){throw new Error(`Al recuperar carrito: ${err}`)}
    }

    async addProductToCart(cartId,productToAdd) {
        try{
            
            let allCarts = await this.getAllCarts();
            let searchedCart = await this.getCartById(cartId).then(cart=>cart)
            
            let searchedProductIndex = searchedCart.cart.products.findIndex(product => product.product == productToAdd)
            
            //if products of cart are empty, add the new product with cantity 1, otherwise, add 1 to cantity  
            if (searchedProductIndex == -1){
                searchedCart.cart.products.push({product: productToAdd, quantity: 1 })
            }else{
                ++searchedCart.cart.products[searchedProductIndex].quantity
            }
  
            allCarts[searchedCart.cartIndex] = searchedCart.cart;

            try {
                await fs.writeFile(this.route, JSON.stringify(allCarts, null, 2))
            }catch (error) {
                throw new Error(`Al guardar Producto ${productToAdd} al carrito: ${error}`)
            }
            
        }catch(err){
            throw new Error(`Al Agregar Producto al Carrito: ${err}`)
        }
    }

    async deleteProductOfCart(cartId,productId) {
        try{
            
            let allCarts = await this.getAllCarts();
            let searchedCart = await this.getCartById(cartId).then(cart=>cart)
            
            let searchedProductIndex = searchedCart.cart.products.findIndex(products => products.product == productId)
            
            if (searchedProductIndex == -1){
                throw new Error(`No se encontró el id de producto: ${productId}`)
            }
        
            searchedCart.cart.products.splice(searchedProductIndex,1)
 
            allCarts[searchedCart.cartIndex] = searchedCart.cart;

            try {
                await fs.writeFile(this.route, JSON.stringify(allCarts, null, 2))
            }catch (error) {
                throw new Error(`Al Guardar Producto ${productId}: ${error}`)
            }
            
        }catch(err){
            throw new Error(`Al Borrar Producto del Carrito: ${err}`)
        }
    }


}

export default Carts