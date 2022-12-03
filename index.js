const express = require('express');
const bodyParser = require('body-parser');
const port = 3030;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/",(req, res)=>{
    res.json({
        err: false,
        status: "Server on",
        message: "Let's go baby"
    })
})

app.post("/send", (req, res)=>{
    let message = req.body.name;

    res.json({
        message: "Hello world " + message
    })
})













app.listen(port, ()=>console.log("Server on"))

