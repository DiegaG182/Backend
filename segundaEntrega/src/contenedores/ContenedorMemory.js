import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'

class ContenedorMemory{
    constructor(){
        this.data = [];
    }

    
    async save(newObj){
        try{
            let idObj = uuidv4();
            const timestamp = moment().format(); 
        
            const object = {id: idObj, timestamp: timestamp, ...newObj} 
            this.data.push(object)
                   
            return idObj;
        }catch(err){throw new Error(`Al Guardar : ${err}`)}
    }
    
    async getAll(){
        
        return  this.data   
        
    }     
 
    async getById(id){  
        try{
            let allObj =  await this.getAll()
            
            const index = allObj.findIndex(o => o.id == id)

            if (index == -1) {
                throw new Error(`No se encontró el id ${id}`)
            }
    
        return {object:allObj[index],objectIndex: index}
        
        }catch(err){throw new Error(`Al recuperar : ${err}`)}       
            
    }

    async deleteAll(){
        
        this.data = []  
    }
    
    async deleteById(id){
        let allObj = await this.getAll()
        console.log(allObj)
        const index = this.data.findIndex(o => o.id == id)
        if (index == -1) {
            throw new Error(`No se encontró el id ${id}`)
        }

        try {
            this.data.splice(index, 1)
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
            
            this.data[index] = {id: allObj[index].id, timestamp: allObj[index].timestamp,...newObj }
    
            }catch (error) {
                throw new Error(`Error al actualizar: ${error}`)
        }
    }


}

export default ContenedorMemory;