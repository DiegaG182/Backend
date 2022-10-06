import dotenv from 'dotenv';
import minimist from "minimist";


const {
    MODE,
    PORT,
    _
}= minimist(process.argv.slice(2),
            {
                alias:{m:"MODE",p:"PORT"},
                default:{m:'PROD',p:8080}
            }
)
console.log({MODE:MODE})
console.log({PORT:PORT})

dotenv.config({
    path:MODE==="PROD"?'./.env.production':'./.env.development'
});

export default {
    init:{
        MODE:MODE,
        PORT:PORT,
    },
    app:{
        MODE:process.env.MODE||'DEV',
        // PORT:process.env.PORT||8080,
        DEBUG:process.env.DEBUG||false
    },
    mongo:{
        MONGO_URL:process.env.MONGO_URL,
        MONOG_USER:process.env.MONGO_USER,
    }
}
