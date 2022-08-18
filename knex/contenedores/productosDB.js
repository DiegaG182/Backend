//import { promises as fs } from 'fs';
import knex from "knex";
class Contenedor{
    constructor(config,tabla){
        this.knex = knex(config);
        this.tabla = tabla;
    }

    
    async save(producto){
                    
        try{
            let exist = this.knex.schema.hasTable(this.tabla)
            if(!exist){
                this.knex.schema.createTable('products', table => {
                    table.primary('id')
                    table.increments('id')
                    table.string('title',50)
                    table.float('price')
                    table.string("thumbnail",150)
                }).then( () => console.log("tabla creada"))
                  .catch((err) => {console.log(err); throw err})
            }
            this.knex(this.tabla).insert(producto).then(() => console.log("Registros insertados"));
            console.log(`Item ${producto} guardado correctamente`);
            
        }catch(err){throw new Error(`error al procesar guardado del Item: ${err}`);}
    }
    
    async getAll(){
        try{
            let exist = this.knex.schema.hasTable(this.tabla)
            if(!exist){
                this.knex.schema.createTable('products', table => {
                    table.primary('id')
                    table.increments('id')
                    table.string('title',50)
                    table.float('price')
                    table.string("thumbnail",150)
                }).then( () => console.log("tabla creada"))
                  .catch((err) => {console.log(err); throw err})
            }
            return this.knex.select('*').from(this.tabla)
            
        }catch(err){
            console.log(`error al leer los productos: ${err}`)
            return [];
        }
    }     
 


}

export default Contenedor;