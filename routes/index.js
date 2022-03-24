var express = require('express');
var router = express.Router();
const axios = require('axios');
const dotenv = require("dotenv");
const { response } = require('../app');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
dotenv.config()



router.get('/', function(req, res, next) {

  console.log("homepage request activated");
  if(!req.cookies.name){
    var user="Visitor";
  }else{
    var user = req.cookies.name;
  }
  axios.get(`${process.env.base_url}/categories?secretKey=${process.env.secretKey}`)
      .then(function (response){

        //console.log(response.data[0]); // ex.: 200
        res.render('index', {categories: response.data, username: user});
      }).catch(function (err){
        console.log(err);
      });
});

module.exports = router;
