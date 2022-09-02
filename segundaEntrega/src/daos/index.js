let ProductsDao;
let CartsDao;

let persist = 'Mongo';

switch (persist){

    case 'FS':
        const {default: ProductsDaoFS} = await import('./products/ProductsDaoFS.js')
        const {default: CartsDaoFS} = await import('./carts/CartsDaoFS.js')
        
        ProductsDao = new ProductsDaoFS()
        CartsDao = new CartsDaoFS()
        break;

    case 'Memory':
        const {default: ProductsDaoMemory} = await import('./products/ProductsDaoMemory.js')
        const {default: CartsDaoMemory} = await import('./carts/CartsDaoMemory.js')
        
        ProductsDao = new ProductsDaoMemory()
        CartsDao = new CartsDaoMemory()
        break; 
    case 'Mongo':
        const {default: ProductsDaoMongo} = await import('./products/ProductsDaoMongo.js')
        const {default: CartsDaoMongo} = await import('./carts/CartsDaoMongo.js')
        
        ProductsDao = new ProductsDaoMongo()
        CartsDao = new CartsDaoMongo()
        break;   
}

export {ProductsDao, CartsDao}