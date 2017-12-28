var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var staticFiles = require ('serve-static');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// log all api traffic to console
app.use('api/*',req=>{
    console.log(req);
    next();
});

//make the password and email global variables to use with all routes
var pass = '123123';

var email = '123@123.123';

app.post('/api/login', function (req, res) {

    if(req.body && req.body.email && req.body.password){
        if(req.body.email == email){

            if(req.body.password == pass) {
                var user ={
                    name:"Alex Jones"
                    , email:req.body.email
                    , password:req.body.password
                    , profilePic:"http://lorempixel.com/500/500/people/"
                };
                res.send(200, user);
            }
            else
                res.send(400,{message:'hey lady, you sent me the wrong password.'});

        }else
            res.send(400,{message:'hey man, you sent me the wrong email.'});

    }
    else
        res.send(422,{message:'yo! you miss`n some stuff!'});
});

//change password route
app.post('/api/changePassword',function(req,res){
    if(req.body.newPassword){
        //change the pass variable to the newPassord
        pass = req.body.newPassword;
        //redirect the user to login page to login with new password
        res.send(200,'false');
    }
    res.send(400, {message:'please fill your new pass'})
})



var serve = staticFiles('public/', {'index': ['index.html']});
app.use(serve);


app.listen(3000);
console.log("running on http://localhost:3000");