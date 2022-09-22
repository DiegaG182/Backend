import { Router } from "express";
import usersService from "../models/Users.js";
import { createHash,isValidPassword } from '../utils.js';
import passport from "passport";
import local from 'passport-local'
const LocalStrategy = local.Strategy

const router = Router();

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginfail'}),async(req,res)=>{

  req.session.user = {
      name:req.user.name,
      email:req.user.email,
      id:req.user._id
  }
  res.redirect(307, 'http://localhost:8080/');
});

router.get('/loginfail',(req,res)=>{
  console.log("Error grave")
  res.status(500).send({status:"error",error:""})
  res.send("Hay un error grave")
});

router.get("/current", (req, res) => {
  if (!req.session.user) {
    // If the user exists, is because it already has gone through login process:
    return res.status(400).send({
      status: "error",
      message: "No current active sessions, please log in",
    });
  }
  res.send({
    status: "success",
    message: `Welcome user ${req.session.user.email}, you still have an ongoing session`,
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error)
      return res.status(500).send({
        status: "error",
        message: "Could not logout, please try again",
      });
  });
  res.send({ status: "success", message: "Logged out!" });
});

export default router;
