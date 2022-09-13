import mongoose from 'mongoose';
import config from '../src/config.js'

await mongoose.connect(config.mongoDB.connection);

class ContenedorMongoDB {
    constructor(collection, schema){

        this.newSchema = new mongoose.Schema(schema, { timestamps: true })
        this.collection = mongoose.model(collection,this.newSchema)

        this.newSchema.pre('find', function(){
            this.populate( 'author' )
        })
            
    }

    async save(newObj){
        try{
            
           let result = await this.collection.create(newObj)
            return(result)
        }catch(err){throw new Error(`Al Guardar : ${err}`)}
    }
    async getByMail(id) {
        try{
            let docs = await this.collection.find({'mail' : id},{__v:0});
            if (docs.length == 0) {
                return (0)
            }else{ return (docs[0]);}
            
        }catch(err){throw new Error(`Al Listar : ${err}`)}
    }    

    async getAll() {
        try{
            let docs = await this.collection.find();
            return docs;
        }catch(err){throw new Error(`Al Listar : ${err}`)}
    }

    async getById(id) {
        try{
            let docs = await this.collection.find({'_id' : id},{__v:0});
            if (docs.length == 0) {
                throw new Error(`No se encontró el id ${id}`)
            }
            
            
            return {object:docs[0],docsIndex: 0};
        }catch(err){throw new Error(`Al Listar : ${err}`)}
    }

    /* async getPopulated(id,entity) {
        try{
            let docs = await this.collection.find({'_id' : id},{__v:0}).populate(entity);
            if (docs.length == 0) {
                throw new Error(`No se encontró el id ${id}`)
            }
            
            return docs[0]
            
        }catch(err){throw new Error(`Al Listar : ${err}`)}
    }
 */
    async deleteById(id){
        
        try {
            const {n,nModified} = await this.collection.deleteOne({'_id': id})
            
            if (n == 0 || nModified == 0) {
                throw new Error(`No se encontró el id ${id}`)
            }
        }catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async updateById(id,newObj){
        try {
            
            const {n,nModified} = await this.collection.updateOne({'_id': id}, {$set: newObj})
            
            if (n == 0 || nModified == 0) {
                throw new Error(`No se encontró el id ${id}`)
            }

        }catch(error) {throw new Error(`Error al actualizar: ${error}`)}
    }


}

export default ContenedorMongoDB;