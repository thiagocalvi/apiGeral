const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();


// database

const CyclicDb = require("@cyclic.sh/dynamodb")
const db = CyclicDb("black-trout-ringCyclicDB")

const suggestion = db.collection("suggestion") 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/",(req, res)=>{
    res.json({
        err: false,
        status: "Server on",
        message: "Let's go baby"
    })
})

app.post("/api/metaversodasgalaxias/suggestions", async (req, res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let suggestionUser = req.body.suggestion;
    
    // await suggestion.set(name, {
    //     name: name,
    //     email: email,
    //     suggestion: suggestionUser
    // })

    // let item = await suggestion.get(name)
    

    let item = {
        nome: name,
        email: email,
        suggestion: suggestionUser
    }

    res.json({
        message: "OK",
        item: item
    })
})













app.listen(port, ()=>console.log("Server on"))

