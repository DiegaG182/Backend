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
            author:  {
                mail: { type: String, required: true },
                name: { type: String, required: true },
                lastName: { type: String, required: true },
                age: { type: Number, required: true },
                alias: { type: String, required: true },
                avatar: { type: String, required: true}
            },
            message: {
                author: {type: mongoose.SchemaTypes.ObjectId,
                         ref: 'authors'                
                },
                message: { type: String, required: true }

            }
        }
    }

}

export default config;