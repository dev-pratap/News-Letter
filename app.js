const express      =  require("express");
const bodyParser   =  require("body-parser");
const request      =  require('request');
const { response } = require("express");
const app          =  express();
const https        =  require('https');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname +'/signup.html');
})


app.post("/",function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;

    var data={
        members:[
            {
                email_address  : email,
                status         : "subscribed",
                merge_fields   : {
                                    FNAME : fname,
                                    LNAME : lname
                                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url      = "https://us5.api.mailchimp.com/3.0/lists/be360f1303 "
    const option   ={
                        method : "POST",
                        auth   : "Dev:3f625af1fa2a8a1d9510c6dec1931e42-us5"
                    }
    const request = https.request(url,option,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
            response.on("data",function(data){
                console.log(JSON.parse(data));
            })
    });
    request.write(jsonData);
    request.end();
});


app.post("/failure",function(req,res){
    res.redirect("/");
})



app.listen(process.env.PORT||3000,function(){
    console.log("Server started");
})

















//unique id
//be360f1303

//Api id
//3f625af1fa2a8a1d9510c6dec1931e42-us5