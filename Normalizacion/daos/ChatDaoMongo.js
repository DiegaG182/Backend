import config from '../src/config.js';
import ContenedorMongo from '../contenedores/ContenedorMongo.js';

class ChatDaoMongo extends ContenedorMongo{

    constructor(){
        super('chat',config.mongoDB.schema.chat)
    }


}
export default ChatDaoMongo;