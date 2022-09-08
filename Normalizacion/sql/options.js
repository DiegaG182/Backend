const optionsSql ={
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'coder_db'
    }
};

const optionsSqlite3 ={
    client: 'sqlite3',
    connection: {
        filename: './sqliteDB.sqlite'
    },
    useNullAsDefault:true
}

export {optionsSql, optionsSqlite3 } ;