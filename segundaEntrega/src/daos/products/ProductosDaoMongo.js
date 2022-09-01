import { config } from '../../config.js';
import ContenedorMongo from '../../contenedores/ContenedorMongo.js';

class ProductsDaoMongo extends ContenedorMongo{

    constructor(){
        super('products',config.products.schema)
    }

    async save(newObj){
        try{
            let allObj = await this.getAll();

            if(allObj.length > 0 ){
                const existProduct = allObj.find(registerObj => registerObj.code == newObj.code)
        
                if (existProduct){
                    throw new Error(`Ya existe el producto a Registrar`)
                }
            }

            super.save(newObj);

        }catch(err){throw new Error(`Al Guardar : ${err}`)}    
    }

}
export default ProductsDaoMongo;
