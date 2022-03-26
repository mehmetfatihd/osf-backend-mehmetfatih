var express = require('express');
var router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
//const app = require('../app');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
dotenv.config();


//CART


//Get Cart

// async function getCart(jwt){
//   var config = {
//     method: 'get',
//     url: `${process.env.base_url}/cart?secretKey=${process.env.secretKey}`,
//     headers: { 
//       'Content-Type': 'application/json', 
//       'Authorization': `Bearer ${jwt}`
//     }
//   };


//   axios(config)
//   .then(function (response) {
//       console.log("getcart activated")
//       //console.log(response.data.items)
//       this.ahmet = {cart: response.data.items, status: response.status}
//       //var ahmet =  response.data.items
//       console.log(ahmet)
//   })
//   .catch(function (error) {
//       var ahmet = {status: "400"}
//   });
//   var ahmet =[];
//   return ahmet
// }
router.get('/cart', function(req, res, next) {

    var config = {
        method: 'get',
        url: `${process.env.base_url}/cart?secretKey=${process.env.secretKey}`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${req.cookies.jwt}`
        }
    };

    axios(config)
    .then(function (response) {
        
        console.log(response.data.items)
        res.render('cart', {items: response.data.items, status: response.status} )
    })
    .catch(function (error) {
        res.render('cart', { status: "400"} )
    console.log(error);
    });
});

//Add Item to Cart
router.get('/addtocart/:id/:var', function(req, res, next){
    console.log("adding request activated")
    var data = JSON.stringify({
        "secretKey": `${process.env.secretKey}`,
        "productId": req.params.id,
        "variantId": req.params.var,
        "quantity": "2"
    });
        
    var config = {
    method: 'post',
    url: `${process.env.base_url}/cart/addItem`,
    headers: { 
        'Authorization': `Bearer ${req.cookies.jwt}`, 
        'Content-Type': 'application/json'
    },
    data : data
    };
    
    axios(config)
    .then(function (response) {
    res.redirect('/order/cart');
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
})

//Get Wishlist

router.get('/wishlist', function(req, res, next) {

    var config = {
        method: 'get',
        url: `${process.env.base_url}/wishlist?secretKey=${process.env.secretKey}`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${req.cookies.jwt}`
        }
    };

    axios(config)
    .then(function (response) {
        
        console.log(response.data.items)
        res.render('wishlist', {items: response.data.items, status: response.status} )
    })
    .catch(function (error) {
        res.render('wishlist', { status: "400"} )
    console.log(error);
    });
});

//Add Item to Wishlist
router.get('/addtowishlist/:id/:var', function(req, res, next){
    console.log("adding request activated")
    var data = JSON.stringify({
        "secretKey": `${process.env.secretKey}`,
        "productId": req.params.id,
        "variantId": req.params.var,
        "quantity": "2"
    });
        
    var config = {
    method: 'post',
    url: `${process.env.base_url}/wishlist/addItem`,
    headers: { 
        'Authorization': `Bearer ${req.cookies.jwt}`, 
        'Content-Type': 'application/json'
    },
    data : data
    };
    
    axios(config)
    .then(function (response) {
    res.redirect('/order/wishlist');
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
})


//Change Quantity in Both
router.post('/changequantity/:id/:var/:location', function(req, res, next) {
    console.log('request has came')
    var data = JSON.stringify({
        "secretKey": `${process.env.secretKey}`,
        "productId": req.params.id,
        "variantId": req.params.var,
        "quantity": req.body.quantity
    });

    
    var config = {
    method: 'post',
    url: `${process.env.base_url}/${req.params.location}/changeItemQuantity`,
    headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${req.cookies.jwt}`
    },
    data : data
    };
      
    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    res.redirect(`/order/${req.params.location}`);
    })
    .catch(function (error) {
    console.log(error);
    });
});
//Delete Item for Both

router.get('/remove/:location/:id/:var', function(req, res, next) {
    console.log('request has came')
    var data = JSON.stringify({
        "secretKey": `${process.env.secretKey}`,
        "productId": req.params.id,
        "variantId": req.params.var
    });

    
    var config = {
    method: 'delete',
    url: `${process.env.base_url}/${req.params.location}/removeItem`,
    headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${req.cookies.jwt}`
    },
    data : data
    };
      
    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    res.redirect(`/order/${req.params.location}`);
    })
    .catch(function (error) {
    console.log(error);
    });
});

//ORDER
// Get Order
router.get('/myorders', function(req,res){
    var config = {
        method: 'get',
        url: `${process.env.base_url}/orders?secretKey=${process.env.secretKey}`,
        headers: { 
          'Authorization': `Bearer ${req.cookies.jwt}`
        }
      };
      console.log('getordert activated');
      axios(config)
      .then(function (response) {
        res.render('dummy', {dummy: JSON.stringify(response.data)});
        //console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        res.render('dummy', {dummy: 'JSON.stringify(response.data)'});
        console.log(error);
      });
      
});

//Create Order
router.get('/create', function(req,res,next){
  var cart = getCart(req.cookies.jwt);
  var data = JSON.stringify({
      "secretKey": `${process.env.secretKey}`,
      "address": "address",
      "paymentId": "1",
      "items": cart
    });
    
    var config = {
      method: 'post',
      url: `${process.env.base_url}/orders`,
      headers: { 
        'Authorization': `Bearer ${req.cookies.jwt}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.render('dummy', {dummy: "order created"})
    })
    .catch(function (error) {
      res.render('dummy', {dummy: "order cannot created"});
      console.log(error);
    });
})

module.exports = router;
