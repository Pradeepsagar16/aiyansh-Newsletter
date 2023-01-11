// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [  
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);      
    const url = "https://us17.api.mailchimp.com/3.0/lists/4d67861b0a";

    const options = {
        method:"POST",
        auth: "Aiyansh:18fc3da9f522dec0289e200050a76734-us17"
    }
    const request = https.request(url, options, function(response){

        if(response.statusCode === 200 ){
            res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html");
        } ;

    response.on("data", function(data){
    console.log(JSON.parse(data));
    });

    request.write(jsonData);
    request.end();

});
});

app.post("/failure", function(req, res){
        res.redirect("/");
});

app.listen(3000, function(){

    console.log("Server is running on port 3000.");
    // if we are using outer server we have to write
    // app.listen(process.env.PORT || 3000, function(){});
});


// api key
// 18fc3da9f522dec0289e200050a76734-us17

// list id
// 4d67861b0a
