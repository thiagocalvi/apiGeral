const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const cors = require("cors");


// database

const CyclicDb = require("@cyclic.sh/dynamodb")
const db = CyclicDb("black-trout-ringCyclicDB")

const suggestion = db.collection("suggestion") 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// nodemailer
const nodemailer = require("nodemailer");

const emailMain = "thiagohcalvi@gmail.com"

async function sendEmail(infoObj){
    let transporter = nodemailer.createTransport({
        host: "smtp.gamil.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: emailMain, // generated ethereal user
          pass: "zsmocrhktwjavtdo", // generated ethereal password
        }
      });

    await transporter.sendMail({
        from:`Metaverso das Galxias <${emailMain}>` , // sender address
        to: `${infoObj.email}`, // list of receivers
        subject: "Obrigado pela sugestão!", // Subject line
        text: `Olá ${infoObj.name}, tudo bem? Espero que sim. \n Gostariamos de agradecer por compartilhar sua opinião, isso nos ajudara a contruir um metaverso que todo gostem \n Atenciosamete, Metaverso das Galaxias`, // plain text body
      });
    

}




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
    
    await suggestion.set(name, {
        name: name,
        email: email,
        suggestion: suggestionUser
    })


    
    let item = await suggestion.get(name)
    await sendEmail(item);



    res.json({
        status: "Ok",
        message: "Sugestão enviada com sucesso!",
        item: item
    })
})


app.get("/getItemMetaversoSugesstion/:key", async (req, res)=>{
    let key = req.params.key 
    let item = await suggestion.get(key);
    res.json({
        item: item
    })
})

app.get("/getItemMetaversoSugesstion", async (req, res)=>{
    let item = await suggestion.scan();
    res.json({
        item: item
    })
})




app.listen(port, ()=>console.log("Server on"))

