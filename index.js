import express from "express";
import bodyParser from 'body-parser'
import cors from 'cors';
import pg from 'pg';

const db = new pg.Client({
    user : 'postgres',
    host : 'localhost',
    database : 'sai',
    password :'1919',
    port:5432
});

db.connect();



const app = express()
app.use(bodyParser.urlencoded({extended:'true'}));
app.use(cors())
app.use(express.json())

app.post("/login",async (req, res)=>{

    const user = req.body;
    try {
    const result = await db.query("Select * from users where username = $1 and password= $2",[user.username, user.password]);

    if(result.rows.length==0){
        res.status(500).send("Invalid credentials");
    }
    else
    {
        res.status(200).send("login successfull");
    }

    }
catch(err){
    console.log(err);
}
    
});

app.post("/register",async (req, res)=>{

    const user = req.body;
    try {
    const result = await db.query("Insert into users(username, password) values ($1,$2)",[user.username, user.password]);
        console.log(result);
        res.status(200).send("Registration successfull");
    }
catch(err){
    console.log(err);
    res.status(500).send("Registration Failed");
}
    
});

app.listen(4000, ()=>{
    console.log("server started");
})