var express = require('express');
var router = express.Router();
const axios = require('axios');
const dotenv = require("dotenv");
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
dotenv.config()



router.get('/', function(req, res, next) {

  if(!req.cookies.name){
    var user="Visitor";
  }else{
    var user = req.cookies.name;
  }
  axios.get(`${process.env.base_url}/categories?secretKey=${process.env.secretKey}`)
      .then(function (response){
        const array = response.data;
        const shuffled = array.sort((a,b) => 0.5 - Math.random()); // this part shuffle response data for feels everytime user see different categories
        res.render('index', {categories: shuffled, username: user});
      }).catch(function (err){
        console.log(err);
      });


});

module.exports = router;
