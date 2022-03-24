var express = require('express');
var router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
//const { request } = require('../app');
const cookieParser = require('cookie-parser');
const { cookie } = require('express/lib/response');
dotenv.config();

router.get('/signup', function(req, res, next) {
    res.render('signup');
});


router.post('/signup', function(req, res,) {
    //console.log(req.body);
    if(req.body.name&& req.body.email && req.body.password && req.body.cPassword){
        if(req.body.password == req.body.cPassword){
            console.log("ahmet mehmet");

            (async () =>{
                console.log("sign up request activated")

                axios.post(`${process.env.base_url}/auth/signup`,{
                    secretKey: `${process.env.secretKey}`,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                  })
                    .then(function(response){
                        res.cookie('name', response.data.user.name);
                        res.cookie('jwt', response.data.token);
                        res.redirect('/');
                        console.log(response.data); // ex.: { user: 'Your User'}
                        console.log(response.status); // ex.: 200
                    }); 
            })();

        }else{
            var err = new Error('Passwords should be match');
            console.log(    "not equal")
        }
    }else{
        console.log(    "not valid")
        var err = new Error('Passwords has includes letters');
    }
    
    //res.send('respond with a resource');
  });

router.get('/signin', function(req, res,) {
  res.render('signin');
});

router.post('/signin', function(req, res, next) {
    if(req.body.email && req.body.password){
        console.log("signin route activated");
        (async () =>{
            console.log("signin request activated")

            axios.post(`${process.env.base_url}/auth/signin`,{
                secretKey: `${process.env.secretKey}`,
                email: req.body.email,
                password: req.body.password
              })
                .then(function(response){
                    res.cookie('name', response.data.user.name);
                    res.cookie('jwt', response.data.token);
                    res.redirect('/');
                    console.log(response.data); // ex.: { user: 'Your User'}
                    console.log(response.status); // ex.: 200
                }); 
        })();
    }else{
        console.log("please fill the info")
        var err = new Error('invalid mail or password')
    }
});

router.get('/signout', function(req, res,) {
    res.clearCookie('name');
    res.clearCookie('jwt');
    res.redirect('/')
  });

  

module.exports = router;
