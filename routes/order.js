var express = require('express');
var router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
//const app = require('../app');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
dotenv.config();


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
router.post('/addtocart', function(req, res, next) {
    console.log('request has came')
    console.log(req.body);
    res.render('cart');
});
module.exports = router;
