const {default: AuthorsDaoMongo} = await import('./AuthorsDaoMongo.js')
    
const {default: MessagesDaoMongo} = await import('./MessagesDaoMongo.js')

const {default: ChatDaoMongo} = await import('./ChatDaoMongo.js')
        
let AuthorsDao = new AuthorsDaoMongo();
let MessagesDao = new MessagesDaoMongo();
let ChatDao = new ChatDaoMongo();
        

export { AuthorsDao, MessagesDao, ChatDao}