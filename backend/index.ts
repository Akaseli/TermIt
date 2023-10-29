import * as dotenv from "dotenv"
dotenv.config({ path: __dirname + '/.env' })

import express from "express"
import http from "http"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser, { urlencoded } from "body-parser"
import session from "express-session"
import passport from "passport"
import jwt from "jsonwebtoken"
import { StrategyOptions, Strategy as JwtStrategy } from "passport-jwt";
import { Pool } from "pg";

import * as bcrypt from "bcrypt";
const salt = 10

const app = express()
const port = 3000
const server = http.createServer(app)

if(process.env.SECRET == undefined){
  throw new Error("Create and fill .env file in this directory to run this.")
}

//Database
const pool = new Pool({
  connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
})

app.use("/api/static", express.static('backend/static'))

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true
  })
);

app.use(cookieParser(process.env.SECRET))
app.use(bodyParser.json())
app.use(urlencoded({extended: true}));

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

const cookieExtractor = (req:any) => {
  let jwt = null

  if(req && req.cookies){
    jwt = req.cookies["jwt"]
  }

  return jwt
}

var options:StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey : process.env.SECRET
}

//Userdata
declare global {
  namespace Express{
    interface User{
      id: number,
      username: string
    }
  }
}

passport.use("jwt", new JwtStrategy(options, (jwt_payload, done) => {

  pool.query("SELECT * FROM users WHERE id = $1", [jwt_payload.id], (err, result) => {
    if (err){
      throw err
    }
    //User exists
    if (result.rowCount > 0){
      return done(null, jwt_payload)
    }
    else {
      return done(null, false)
    }
  })
}));

app.get("/api/", (req, res) => {
  res.json({online: true})
})

// === ACCOUNT ROUTES ===
app.post("/api/login/", (req, res) => {
  pool.query("SELECT * FROM users WHERE username = $1", [req.body.username], async (err, result) => {
    if(err){
      throw err
    }

    // Username -> validate
    if (result.rows.length > 0){
      const password = req.body.password
      const userpassword = result.rows[0].password

      const match = bcrypt.compareSync(password, userpassword)

      //Login
      if(match){
        const payload = {
          id: result.rows[0].id,
          username: result.rows[0].username
        }

        if(process.env.SECRET == undefined){
          throw new Error("Secret not defined.")
        }

        //Expires in 1 day
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn : 60*60*24 })
        
        res.cookie('jwt', token, {
          httpOnly: true,
          secure: process.env.PRODUCTION ? true : false
        }).send({message: "Login successful.", status: "success", id: payload.id, username: payload.username})

      }
      //Incorrect password
      else{
        res.send({message: "Incorrect username or password."})
      }
    }
    //No user
    else{
      res.send({message: "Incorrect username or password."})
    }
  })
})

app.post("/api/signup/", (req, res) => {
  //TODO validate password lenght and username lenght
  if(req.body.username.length < 4){
    res.send({message: "Username too short."})
    return
  }
  if(req.body.password.length < 6){
    res.send({message: "Password too short."})
    return
  }

  pool.query("SELECT * FROM users WHERE username = $1", [req.body.username], async (err, result) => {
    if(err){
      throw err
    }
    // User exists
    if (result.rows.length > 0){
      res.send({message: "Username taken."})
    }

    //Doesnt exist -> Create user
    if (result.rows.length == 0){
      const username = req.body.username
      let password = bcrypt.hashSync(req.body.password, salt) 

      pool.query("INSERT INTO users(username, password) VALUES ($1, $2)", [username, password], (err, result) => {
        if(err){
          throw err
        }
        console.log("CREATED USER")
        res.send({message: "Account Successfully created!", status: "success"})
      })
    }
  })
})

app.get("/api/user", passport.authenticate("jwt", {session: false}), async (req, res) => {
  res.send({id: req.user?.id, username: req.user?.username})
})

server.listen(port, () => {
  console.log("Backend is up on port " + port)
})