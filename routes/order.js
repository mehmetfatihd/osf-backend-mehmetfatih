var express = require('express');
var router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
//const app = require('../app');
const app = express();
const cookieParser = require('cookie-parser');
const { get } = require('express/lib/response');
app.use(cookieParser());
dotenv.config();



//CART

router.get('/cart', async (req, res, next) => {
    var config = {
        method: 'get',
        url: `${process.env.base_url}/cart?secretKey=${process.env.secretKey}`,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${req.cookies.jwt}`
        }
    };

    async function renderCart(config){
        const cartArray = await axios(config) .catch(function (error) { console.log(error);});
        const productRequests = []
        obj=[];
        
        for(i=0;i<cartArray.data.items.length; i++){
            productInfoAll = await axios.get( `${process.env.base_url}/products/product_search?id=${cartArray.data.items[i].productId}&secretKey=$2a$08$IfsijPJvzincPvoqP7L1RO5M10oW96.nmtsS3lv62MSzLZeg9k.1S`)
            var sliceTemp = productInfoAll.data[0].image_groups[0].images[0].title.slice(0,-1);
            var sliceTemp2 = sliceTemp.slice(0,-1);
            productInfoAll.data[0].image_groups[0].images[0].title = sliceTemp2;
            productInfo = productInfoAll.data[0].image_groups[0].images[0]
            productRequests.push(productInfo)
            var a=cartArray.data.items[i]
            var b=productRequests[i]
            obj[i]={...a, ...b}
        }

        return obj
      
    }
    var cartInfo = await renderCart(config)
    res.render('cart', {items: cartInfo, status: "200"}) ;

});



//Add Item to Cart
router.get('/addtocart/:id/:var', function(req, res, next){

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

    })
    .catch(function (error) {
    console.log(error);
    });
})

//Get Wishlist


router.get('/wishlist', async function(req, res, next) {

    var config = {
        method: 'get',
        url: `${process.env.base_url}/wishlist?secretKey=${process.env.secretKey}`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${req.cookies.jwt}`
        }
    };

    async function renderWish(config){
        const wishArray = await axios(config) .catch(function (error) { console.log(error);});
          
        const productRequests = []
        obj=[];
        
        for(i=0;i<wishArray.data.items.length; i++){
            productInfoAll = await axios.get( `${process.env.base_url}/products/product_search?id=${wishArray.data.items[i].productId}&secretKey=$2a$08$IfsijPJvzincPvoqP7L1RO5M10oW96.nmtsS3lv62MSzLZeg9k.1S`)
            var sliceTemp = productInfoAll.data[0].image_groups[0].images[0].title.slice(0,-1);
            var sliceTemp2 = sliceTemp.slice(0,-1);
            productInfoAll.data[0].image_groups[0].images[0].title = sliceTemp2;
            productInfo = productInfoAll.data[0].image_groups[0].images[0]
            productRequests.push(productInfo)
            var a=wishArray.data.items[i]
            var b=productRequests[i]
            obj[i]={...a, ...b}
        }

        return obj

    }
    var wishInfo = await renderWish(config)
    res.render('wishlist', {items: wishInfo, status: "200"});
});

//Add Item to Wishlist
router.get('/addtowishlist/:id/:var', function(req, res, next){

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

    })
    .catch(function (error) {
    console.log(error);
    });
})


//Change Quantity in Both
router.post('/changequantity/:id/:var/:location', function(req, res, next) {

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
    res.redirect(`/order/${req.params.location}`);
    })
    .catch(function (error) {
    console.log(error);
    });
});
//Delete Item for Both

router.get('/remove/:location/:id/:var', function(req, res, next) {

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
      axios(config)
      .then(function (response) {
        res.render('dummy', {dummy: JSON.stringify(response.data)});

      })
      .catch(function (error) {
        console.error(error);
      });
      
});

//Create Order
router.post('/create', async function(req,res,next){
    var config = {
        method: 'get',
        url: `${process.env.base_url}/cart?secretKey=${process.env.secretKey}`,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${req.cookies.jwt}`
        }
    };

    async function createOrder(config){
        const cartArray = await axios(config);

        var data = JSON.stringify({
            "secretKey": `${process.env.secretKey}`,
            "address": req.params.adress,
            "paymentId": "1",
            "items": cartArray.data.items
        });

        var config2 = {
        method: 'post',
        url:  `${process.env.base_url}/orders`,
        headers: { 
            'Authorization': `Bearer ${req.cookies.jwt}`, 
            'Content-Type': 'application/json'
        },
        data : data
        };
        
        const obj = await axios(config2)

        return obj
    }
    var orderDetail = await createOrder(config)
    res.render('dummy', {dummy: orderDetail});


})

module.exports = router;
