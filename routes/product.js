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
  if(!req.cookies.name){
    var user="Visitor";
  }else{
    var user = req.cookies.name;
  }

  var catName = req.params.id.replaceAll("-", " ").toUpperCase();
  if(req.params.id=="womens-accessories" || req.params.id=="womens-jewelry" || req.params.id=="womens-clothing" || req.params.id=="mens-clothing"){
    res.redirect(`/parent/${req.params.id}`)
  }else{
    //catName = axios.get(`${process.env.base_url}/categories/${req.params.id}&secretKey=${process.env.secretKey}`)
    axios.get(`${process.env.base_url}/products/product_search?primary_category_id=${req.params.id}&secretKey=${process.env.secretKey}`)
    .then(function (response){
      res.render('category', {subCategory: response.data,  username: user, categoryName: catName, categoryId: req.params.id});
    }).catch(function (err){
      console.log(err);
      console.error(err);
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
      var catName = response.data[0].primary_category_id.replaceAll("-", " ").toUpperCase();
      var proName = response.data[0].name.replaceAll("-", " ").toUpperCase();
      res.render('product', {product: response.data, username: user, categoryName:catName, productName: proName, categoryId: response.data[0].primary_category_id});
    }).catch(function (err){
      console.log(err);
      console.error(err);
    });
});


module.exports = router;
