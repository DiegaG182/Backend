import config from '../../config.js';
import ContenedorMongo from '../../contenedores/ContenedorMongo.js';

class CartsDaoMongo extends ContenedorMongo{

    constructor(){
        super('carts',config.mongoDB.schema.carts)
    }

    async createCart(){
        return super.save({products:[]});
    }
    

    async addProductToCart(cartId,productToAdd) {
        try{
            
            let searchedCart = await this.getById(cartId).then(cart=>cart)
            console.log(searchedCart)
            let searchedProductIndex = searchedCart.object.products.findIndex(product => product.product == productToAdd)
            
            //if products of cart are empty, add the new product with cantity 1, otherwise, add 1 to cantity  
            try {
            if (searchedProductIndex == -1){
                searchedCart.object.products.push({product: productToAdd, quantity: 1 })
            }else{
                ++searchedCart.object.products[searchedProductIndex].quantity
            }
            console.log(searchedCart.object.products)
            let result = await this.updateById(cartId, searchedCart.object.products)
            console.log(result)
            }catch (error) {
                throw new Error(`Al guardar Producto ${productToAdd} al carrito: ${error}`)
            }
            
        }catch(err){
            throw new Error(`Al Agregar Producto al Carrito: ${err}`)
        }
    }

    async deleteProductOfCart(cartId,productId) {
        try{
            
            let allCarts = await this.getAll();
            let searchedCart = await this.getById(cartId).then(cart=>cart)
            
            let searchedProductIndex = searchedCart.object.products.findIndex(products => products.product == productId)
            
            if (searchedProductIndex == -1){
                throw new Error(`No se encontró el id de producto: ${productId}`)
            }
        
            searchedCart.object.products.splice(searchedProductIndex,1)
 
            try {
                await this.updateById(cartId, searchedCart.object.products)
            }catch (error) {
                throw new Error(`Al Guardar Producto ${productId}: ${error}`)
            }
            
        }catch(err){
            throw new Error(`Al Borrar Producto del Carrito: ${err}`)
        }
    }


}

export default CartsDaoMongo;