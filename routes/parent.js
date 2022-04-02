var express = require('express');
var router = express.Router();
const axios = require('axios');
const dotenv = require("dotenv");
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
dotenv.config()


// get main category
router.get('/:id', function(req, res, next) {
    if(!req.cookies.name){
      var user="Visitor";
    }else{
      var user = req.cookies.name;
    }
    var catName = req.params.id.replaceAll("-", " ").toUpperCase();
    axios.get(`${process.env.base_url}/categories/parent/${req.params.id}?secretKey=${process.env.secretKey}`)
    .then(function (response){
      res.render('index', {categories: response.data, username: user, categoryName: catName, categoryId: req.params.id});
    }).catch(function (err){
      console.log(err);
      console.error(err);
    });
});

module.exports = router;