//import { promises as fs } from 'fs';
import knex from "knex";
class ContenedorMensajes{
    constructor(config,tabla){
        this.knex = knex(config);
        this.tabla = tabla;
    }

    
    async save(mensaje){
        try{
            let exist = this.knex.schema.hasTable(this.tabla)
            if(!exist){
                await this.knex.schema.createTable('messages', table => {
                    table.string('userName',50)
                    table.string('date',19)
                    table.string("message",150)
                }).then( () => console.log("tabla message creada"))
                  .catch((err) => {console.log(err); throw err})
            }
            
            this.knex(this.tabla).insert(mensaje).then(() => console.log("Registros insertados"));
           
            
        }catch(err){throw new Error(`error al procesar guardado del Item: ${err}`);}
    }
    
    async getAll(){
        try{
            let exist = await this.knex.schema.hasTable(this.tabla).then(x=>x)
            if(!exist){
                this.knex.schema.createTable('messages', table => {
                    table.string('userName',50)
                    table.string('date',19)
                    table.string("message",150)
                }).then( () => console.log("tabla message creada"))
                  .catch((err) => {console.log(err); throw err})
            }
            return this.knex.select('*').from(this.tabla)  
        }catch(err){
            console.log(`error al leer los productos: ${err}`)
            return [];
        }
    }     
 
    
}

export default ContenedorMensajes;