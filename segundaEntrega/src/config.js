export default {
    mongoDB: {
        connection: 'mongodb://127.0.0.1:27017/ecommerce',
        schema: { 
            carts: {
                products: { type: Number, required: true }    
            },
            products:  {
                name: { type: String, required: true },
                description: { type: String, required: true },
                code: { type: String, required: true },
                description: { type: String, required: true },
                thumbnail: { type: String, required: true },
                price: { type: Number, required: true },
                stock: { type: Number, required: true }
            }
        }
    }

}
