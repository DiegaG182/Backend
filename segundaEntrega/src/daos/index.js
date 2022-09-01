let ProductsDao;
let CartsDao;

let persist = 'FS';

switch (persist){

    case 'FS':
        const {default: ProductsDaoFS} = await import('./products/ProductsDaoFS.js')
        const {default: CartsDaoFS} = await import('./carts/ProductsDaoFS.js')
        
        ProductsDao = new ProductsDaoFS()
        CartsDao = new CartsDaoFS()
        break;

    case 'Memory':
        const {default: ProductsDaoMemory} = await import('./products/ProductsDaoMemory.js')
        const {default: CartsDaoMemory} = await import('./carts/ProductsDaoMemory.js')
        
        ProductsDao = new ProductsDaoMemory()
        CartsDao = new CartsDaoMemory()
        break; 
    case 'Mongo':
        const {default: ProductsDaoMongo} = await import('./products/ProductsDaoMongo.js')
        const {default: CartsDaoMongo} = await import('./carts/ProductsDaoMongo.js')
        
        ProductsDao = new ProductsDaoMongo()
        CartsDao = new CartsDaoMongo()
        break;   
}

export {ProductsDao, CartsDao}