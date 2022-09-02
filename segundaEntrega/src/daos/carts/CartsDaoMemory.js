import ContenedorMemory from '../../contenedores/ContenedorMemory.js';

class CartsDaoMemory extends ContenedorMemory{

    constructor(){
        super()
    }

    async createCart(){
        super.save([]);
    }
    

    async addProductToCart(cartId,productToAdd) {
        try{
            
            let allCarts = await this.getAll();
            let searchedCart = await this.getById(cartId).then(cart=>cart)
            
            let searchedProductIndex = searchedCart.cart.products.findIndex(product => product.product == productToAdd)
            
            //if products of cart are empty, add the new product with cantity 1, otherwise, add 1 to cantity  
            if (searchedProductIndex == -1){
                searchedCart.cart.products.push({product: productToAdd, quantity: 1 })
            }else{
                ++searchedCart.cart.products[searchedProductIndex].quantity
            }
  
            allCarts[searchedCart.cartIndex] = searchedCart.cart;

            try {
                this.data = allCarts
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
            
            let searchedProductIndex = searchedCart.cart.products.findIndex(products => products.product == productId)
            
            if (searchedProductIndex == -1){
                throw new Error(`No se encontró el id de producto: ${productId}`)
            }
        
            searchedCart.cart.products.splice(searchedProductIndex,1)
 
            allCarts[searchedCart.cartIndex] = searchedCart.cart;

            try {
                this.data = allCarts
            }catch (error) {
                throw new Error(`Al Guardar Producto ${productId}: ${error}`)
            }
            
        }catch(err){
            throw new Error(`Al Borrar Producto del Carrito: ${err}`)
        }
    }


}

export default CartsDaoMemory