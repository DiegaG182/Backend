import { promises as fs } from 'fs';
class Mensajes{
    constructor(nombreArchivo){
        this.ruta = nombreArchivo;
    }

    
    async save(mensaje){
        let mensajes = await this.getAll()
        
        const newMessage = mensaje 
        mensajes.push(newMessage)               
        try{
            await fs.writeFile(`${this.ruta}`,JSON.stringify(mensajes, null, 2));
            console.log(`Mensaje guardado correctamente`);
        }catch(err){throw new Error(`error al procesar guardado del Mensaje: ${err}`);}
    }
    
    async getAll(){
        try{
            const messages = await fs.readFile(`${this.ruta}`,'utf-8');
            return JSON.parse(messages)   
        }catch(err){
            console.log(`error al leer los mensajes: ${err}`)
            return [];
        }
    }     

    deleteAll(){
        fs.unlink(`${this.ruta}`, err => {
            err ? console.log(`error al borrar archivo: ${err}`)
                : console.log(`Archivo borrado con exito`)
        })
    }
    
    
}

export default Mensajes;