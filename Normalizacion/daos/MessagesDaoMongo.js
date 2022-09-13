import config from '../src/config.js';
import ContenedorMongo from '../contenedores/ContenedorMongo.js';

class MessagesDaoMongo extends ContenedorMongo{

    constructor(){
        super('messages',config.mongoDB.schema.message)
    }


}
export default MessagesDaoMongo;