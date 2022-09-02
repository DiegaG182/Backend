import mongoose from "mongoose";
const config = {
    mongoDB: {
        connection: 'mongodb://127.0.0.1:27017/ecommerce',
        schema: { 
            carts: {
            //    products: [new Schema({ product: String , quantity: Number })]
                products: [mongoose.Schema.Types.Mixed]
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

export default config;