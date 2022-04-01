var express = require('express');
var router = express.Router();
const dotenv = require("dotenv");
const axios = require('axios');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
dotenv.config()


//get subcategory 
router.get(['/categories/:id'], function(req, res) {

  if(req.params.id=="womens-accessories" || req.params.id=="womens-jewelry" || req.params.id=="womens-clothing"){
    res.redirect(`/parent/${req.paramas.id}`)
  }else{

    axios.get(`${process.env.base_url}/products/product_search?primary_category_id=${req.params.id}&secretKey=${process.env.secretKey}`)
    .then(function (response){
      res.render('category', {subCategory: response.data});
    }).catch(function (err){
      console.log(err);
    });
  }
});


// get single product
router.get(['/product_id/:id'], function(req, res) {

    if(!req.cookies.name){
        var user="Visitor";
      }else{
        var user = req.cookies.name;
    }

    axios.get(`${process.env.base_url}/products/product_search?id=${req.params.id}&secretKey=${process.env.secretKey}`)
    .then(function (response){

      res.render('product', {product: response.data, username: user});
    }).catch(function (err){
      console.log(err);
    });
});


module.exports = router;
