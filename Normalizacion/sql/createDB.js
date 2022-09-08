import {optionsSql, optionsSqlite3} from './options.js';
import knex from 'knex';

const mariaDB = knex(optionsSql);
mariaDB.schema.createTable('products', table => {
    table.primary('id')
    table.increments('id')
    table.string('title',50)
    table.float('price')
    table.string("thumbnail",150)
}).then( () => console.log("tabla creada"))
  .catch((err) => {console.log(err); throw err})
  .finally(()=> {
    mariaDB.destroy();
  })

const sqlite3 = knex(optionsSqlite3)
    sqlite3.schema.createTable('messages', table => {
      table.string('userName',50)
      table.string('date',19)
      table.string("message",150)
}).then( () => console.log("tabla message creada"))
  .catch((err) => {console.log(err); throw err})