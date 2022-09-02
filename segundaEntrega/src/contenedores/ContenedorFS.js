import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'

class ContenedorFS{
    constructor(fileName){
        this.route = fileName;
        this.id = 0;
    }

    
    async save(newObj){
        try{
            let allObj = await this.getAll()
            let idObj = uuidv4();
            const timestamp = moment().format(); 
        
            const object = {id: idObj, timestamp: timestamp, ...newObj} 
            allObj.push(object)
        
            await fs.writeFile(`${this.route}`,JSON.stringify(allObj, null, 2));
            
            return idObj;
        }catch(err){throw new Error(`Al Guardar el Item: ${err}`);}
    }
    
    async getAll(){
        try{
            const allObj = await fs.readFile(`${this.route}`,'utf-8');
            
            return JSON.parse(allObj)   
        }catch(err){
            return [];
        }
    }     
 
    async getById(id){  
        try{
            const allObj = await this.getAll()
            const index = allObj.findIndex(o => o.id == id)
            if (index == -1) {
                throw new Error(`No se encontró el id ${id}`)
            }
                
        return {object:allObj[index],objectIndex: index}
        }catch(err){throw new Error(`Al recuperar : ${err}`)}       
            
    }

    async deleteAll(){
        try{
            await fs.writeFile(`${this.route}`,JSON.stringify([], null, 2));

        }catch(err){throw new Error(`Al Borrar Todo: ${err}`);}    
    }
    
    async deleteById(id){
        const allObj = await this.getAll()
        const index = allObj.findIndex(o => o.id == id)
        if (index == -1) {
            throw new Error(`No se encontró el id ${id}`)
        }

        allObj.splice(index, 1)
        try {
            await fs.writeFile(this.route, JSON.stringify(allObj, null, 2))
        }catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async updateById(id,newObj){
        try {
            const allObj = await this.getAll();
            const index = allObj.findIndex(p => p.id == id)
            if (index == -1) {
                throw new Error(`No se encontró el id ${id}`)
            }
            allObj[index] = {id: allObj[index].id, timestamp: allObj[index].timestamp, ...newObj }
        

            await fs.writeFile(this.route, JSON.stringify(allObj, null, 2))
        }catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }


}

export default ContenedorFS;