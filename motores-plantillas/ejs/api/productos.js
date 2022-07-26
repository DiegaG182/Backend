
class Contenedor{
    constructor(){
        this.products = [
            {
              "title": "Escuadra",
              "price": 123.45,
              "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
              "id": 1
            },
            {
              "title": "Calculadora",
              "price": 234.56,
              "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
              "id": 2
            },
            {
              "title": "Globo Terráqueo",
              "price": 345.67,
              "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
              "id": 3
            }
          ];
        this.id = 0;
    }

    
    save(producto){
        let prods = this.getAll()
        let ids = 1;

        if(prods.length > 0 ){
            ids = (prods[prods.length-1].id) + 1;
        }
        const newProd = {...producto, id: ids}                
        this.products.push(newProd)
        
        return ids;
    }
    

    getAll(){
        try{
            const prods =  this.products;
            return prods   
        }catch(err){
            console.log(`error al leer los productos: ${err}`)
            return [];
        }
    }    

    getById(id){         
        const prods = this.getAll()
        console.log(id)
        const index = prods.findIndex(p => p.id == id)
        
        if (index == -1) {
            throw new Error(`Error al obtener producto: no se encontró el id ${id}`)
        }
    
        return this.products[index]
              
        
    }

    deleteAll(){
        this.products = [];
    }
    
    async deleteById(id){
        const prods = this.getAll()
        const index = prods.findIndex(p => p.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }

        this.products.splice(index, 1)
        
    }

    updateById(id,newProd){
        const prods = this.getAll()
        const index = prods.findIndex(p => p.id == id)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        }
        this.products[index] = {...newProd, id: prods[index].id}
    }


}

export default Contenedor;