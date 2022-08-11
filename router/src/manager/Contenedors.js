import { promises as fs } from 'fs';
class Contenedor{
    constructor(nombreArchivo){
        this.ruta = nombreArchivo;
        this.id = 0;
    }

    
    async save(producto){
        let productos = await this.getAll()
        let ids = 1;

        if(productos.length > 0 ){
            ids = (productos[productos.length-1].id) + 1;
        }
        const newProduct = {...producto, id: ids} 
        productos.push(newProduct)               
        try{
            await fs.writeFile(`${this.ruta}`,JSON.stringify(productos, null, 2));
            console.log(`Item ${ids} guardado correctamente`);
            return ids;
        }catch(err){throw new Error(`error al procesar guardado del Item: ${err}`);}
    }
    
    async getAll(){
        try{
            const products = await fs.readFile(`${this.ruta}`,'utf-8');
            return JSON.parse(products)   
        }catch(err){
            console.log(`error al leer los productos: ${err}`)
            return [];
        }
    }     
 
    async getById(id){  
        try{
            const products = await this.getAll()
            const index = products.findIndex(p => p.id == id)
            if (index == -1) {
                throw new Error(`Error al obtener producto: no se encontró el id ${id}`)
            }
    
        return products[index]
        }catch{console.log('Error al buscar elemento por ID') }       
        
              
        
    }

    deleteAll(){
        fs.unlink(`${this.ruta}`, err => {
            err ? console.log(`error al borrar archivo: ${err}`)
                : console.log(`Archivo borrado con exito`)
        })
    }
    
    async deleteById(id){
        const products = await this.getAll()
        const index = products.findIndex(p => p.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }else{
           
        products.splice(index, 1)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(products, null, 2))
        }catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
        }
    }

    async updateById(id,newProd){
        const products = await this.getAll()
        const index = products.findIndex(p => p.id == id)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        }
        products[index] = {...newProd, id: products[index].id}
        
        try {
            await fs.writeFile(this.ruta, JSON.stringify(products, null, 2))
        }catch (error) {
            throw new Error(`Error al Actualizar: ${error}`)
        }
    }

}


export default Contenedor;