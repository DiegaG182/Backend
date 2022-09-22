import { Router } from "express";
import usersService from "../models/Users.js";
import { createHash,isValidPassword } from '../utils.js';
import passport from "passport";
import local from 'passport-local'
const LocalStrategy = local.Strategy

const router = Router();

router.get("/register", async (req, res) => {
    res.render("auth")
});

router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerfail'}),async (req,res)=>{
    console.log(req.user)
    res.send({status:"succes",payload:req.user._id})
})
router.get('/registerfail',(req,res)=>{
    console.log("Error grave")
    res.status(500).send({status:"error",error:""})
})

export default router;