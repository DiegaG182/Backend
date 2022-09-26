import passport from "passport";
import local from 'passport-local'
import userService from "../models/Users.js";
import { createHash,isValidPassword } from '../utils.js';
const LocalStrategy = local.Strategy

const initializePassport = () =>{

    passport.use('register',new LocalStrategy({passReqToCallback:true,usernameField:"email"},
    async(req,email,password,done)=>{
        const {name} = req.body;
        if(!name||!email||!password) return done(null,false,{message:"Incomplete values"})
        //¿El usuario ya está en la base de datos?
        const exists = await userService.findOne({email:email});
        if(exists) return done(null,false,{message:"user alredy exists!"})
        //Insertamos en la base
        const newUser = {
            name,
            email,
            password:createHash(password)
        }
        let result = await userService.create(newUser);
        return done(null,result)
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        let result = await userService.findOne({_id:id})
        return done(null,result)
    })
}

passport.use('login',new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
 try{    
    if(!email||!password) return done(null,false,{menssage:"incorrect credentioal"})
    let user = await userService.findOne({email:email})
    if(!user) return done(null,false,{menssage:"incorrect credential"})
    if(!await isValidPassword(user,password)) return done(null,false,{menssage:"incorrect credential"})
    return done(null,user);}
        catch(error){done(error)}
 }))

export default initializePassport;