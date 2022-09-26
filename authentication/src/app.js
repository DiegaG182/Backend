import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import authRouter from "./routes/auth.router.js";
import initializePassport from './config/passport.config.js';
import passport from 'passport';


const app = express();
const connection = mongoose.connect(
  "mongodb+srv://riquelme182:0401Nutella1105@cluster0.2kbgbhl.mongodb.net/BaseStore?retryWrites=true&w=majority",
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Atlas DB connected");
    }
  }
);
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
      "mongodb+srv://riquelme182:0401Nutella1105@cluster0.2kbgbhl.mongodb.net/BaseStore?retryWrites=true&w=majority",
      ttl: 600,
    }),
    secret: "C0derSessi0n3000",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.static(__dirname + "/public"));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter); 
app.use("/auth",authRouter);

const server = app.listen(8080, () => {
  console.log("Listening on 8080! ");
});
