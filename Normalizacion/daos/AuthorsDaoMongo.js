import config from '../src/config.js';
import ContenedorMongo from '../contenedores/ContenedorMongo.js';

class AuthorsDaoMongo extends ContenedorMongo{

    constructor(){
        super('authors',config.mongoDB.schema.author)
    }


}
export default AuthorsDaoMongo;
