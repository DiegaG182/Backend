import ContenedorFS from '../../contenedores/ContenedorFS.js';


class ProductsDaoFS extends ContenedorFS{

    constructor(){
        super('../../products.json')
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
export default ProductsDaoFS;

