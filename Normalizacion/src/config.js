import mongoose from "mongoose";
const config = {
    mongoDB: {
        connection: 'mongodb://127.0.0.1:27017/ecommerce',
        schema: { 
            carts: {
            //    products: [new Schema({ product: String , quantity: Number })]
                products: { type: [], required: true }
            },
            products:  {
                name: { type: String, required: true },
                description: { type: String, required: true },
                code: { type: String, required: true },
                description: { type: String, required: true },
                thumbnail: { type: String, required: true },
                price: { type: Number, required: true },
                stock: { type: Number, required: true }
            },
            messages:  {
                //_id: { type: mongoose.Types.ObjectId, required: true },
                message: { type: String, required: true },
                author: { type: [], required: true}
            }
        }
    }

}

export default config;