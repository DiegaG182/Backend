import { promises as fs } from 'fs';
import moment from 'moment'
class Products{
    constructor(fileName){
        this.route = fileName;
        this.id = 0;
    }

    
    async saveProduct(product){
        try{
            let allProducts = await this.getAllProducts()
            let idProd = 1;

            if(allProducts.length > 0 ){
                idProd = (allProducts[allProducts.length-1].id) + 1;

                const existProduct = allProducts.find(registerProduct => registerProduct.code == product.code)
            
                if (existProduct){
                    throw new Error(`Ya existe el producto a Registrar`)
                }

            }

            const timestamp = moment().format(); 
        
            const newProduct = {id: idProd, timestamp: timestamp, ...product} 
            allProducts.push(newProduct)
        
            await fs.writeFile(`${this.route}`,JSON.stringify(allProducts, null, 2));
            
            return idProd;
        }catch(err){throw new Error(`Al Guardar el Item: ${err}`);}
    }
    
    async getAllProducts(){
        try{
            const allProducts = await fs.readFile(`${this.route}`,'utf-8');
            return JSON.parse(allProducts)   
        }catch(err){
            return [];
        }
    }     
 
    async getProductById(id){  
        try{
            const allProducts = await this.getAllProducts()
            const index = allProducts.findIndex(p => p.id == id)
            if (index == -1) {
                throw new Error(`No se encontró el id ${id}`)
            }
    
        return allProducts[index]
        }catch(err){throw new Error(`Al recuperar producto: ${err}`)}       
            
    }

    deleteAllProducts(){
        fs.unlink(`${this.route}`, err => {
            err ? console.log(`Error al borrar archivo: ${err}`)
                : console.log(`Archivo borrado con exito`)
        })
    }
    
    async deleteProductById(id){
        const allProducts = await this.getAllProducts()
        const index = allProducts.findIndex(p => p.id == id)
        if (index == -1) {
            throw new Error(`No se encontró el id ${id}`)
        }

        allProducts.splice(index, 1)
        try {
            await fs.writeFile(this.route, JSON.stringify(allProducts, null, 2))
        }catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async updateProductById(id,newProd){
        try {
            const allProducts = await this.getAllProducts()
            const index = allProducts.findIndex(p => p.id == id)
            if (index == -1) {
                throw new Error(`No se encontró el id ${id}`)
            }
            allProducts[index] = {id: allProducts[index].id, timestamp: allProducts[index].timestamp, ...newProd }
        

            await fs.writeFile(this.route, JSON.stringify(allProducts, null, 2))
        }catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }


}

export default Products;