import mongoose from 'mongoose';
import config from '../config.js'

await mongoose.connect(config.mongoDB.connection);

class ContenedorMongoDB {
    constructor(collection, schema){
        this.newSchema = new mongoose.Schema(schema, { timestamps: true })
        this.collection = mongoose.model(collection,this.newSchema)
    }

    async save(newObj){
        try{
            
            await this.collection.create(newObj)

        }catch(err){throw new Error(`Al Guardar : ${err}`)}
    }


    async getAll() {
        try{
            let docs = await this.collection.find();
            docs.map(d => renameField(d, '_id', 'id'))
            return docs;
        }catch(err){throw new Error(`Al Listar : ${err}`)}
    }

    async getById(id) {
        try{
            let docs = await this.collection.find({'_id' : id});
            if (docs.length == 0) {
                throw new Error(`No se encontró el id ${id}`)
            }
            docs.map(d => renameField(d, '_id', 'id'))
            return docs;
        }catch(err){throw new Error(`Al Listar : ${err}`)}
    }

    async updateById(id,newObj){
        try {
            
            const {n,nModified} = await this.collection.replaceOne({'_id': id}, newObj)
            
            if (n == 0 || nModified == 0) {
                throw new Error(`No se encontró el id ${id}`)
            }

        }catch(error) {throw new Error(`Error al actualizar: ${error}`)}
    }


}

export default ContenedorMongoDB;