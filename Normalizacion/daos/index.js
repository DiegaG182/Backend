const {default: AuthorsDaoMongo} = await import('./AuthorsDaoMongo.js')
    
const {default: MessagesDaoMongo} = await import('./MessagesDaoMongo.js')
        
let AuthorsDao = new AuthorsDaoMongo()
let MessagesDao = new MessagesDaoMongo()
        

export { AuthorsDao, MessagesDao}