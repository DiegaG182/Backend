const Contenedor = require('./contenedor');
const escuadra = {                                                                                                                                                    
    title: 'Escuadra',                                                                                                                                 
    price: 123.45,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'                                                                                                                                                          
  }
  
const calculadora = {                                                                                                                                                    
        title: 'Calculadora',                                                                                                                              
        price: 234.56,                                                                                                                                     
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'                                                                                                                                                                                        
     }
     
const globo = {                                                                                                                                                     
title: 'Globo Terráqueo',                                                                                                                          
price: 345.67,                                                                                                                                     
thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'                                                                                                                                              
}

const contenedor = new Contenedor('productos.txt');
contenedor.getAll().then( x => console.log(x))
contenedor.getById(3).then(x => console.log(x)).then(contenedor.deleteById(3))


//contenedor.save(globo)

//contenedor.deleteAll();
