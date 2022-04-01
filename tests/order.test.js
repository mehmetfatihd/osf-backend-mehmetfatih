// const order = require('../routes/order.js');
// const dotenv = require("dotenv");
// const request = require('supertest');
// const express = require('express');
// const app = express();
// const expect = require('chai').expect;
// var bodyParser = require('body-parser');

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

// app.use('/order/cart', order);
// app.use('/order/wishlist', order);


// describe('GET order/cart', ()=>{
//     it('should be render cart', (done)=>{
//         request(app)
//             .get(`/${process.env.base_url}/cart?secretKey=${process.env.secretkey}`)
//             .set('Accept', 'application/json')
//             .set('Content-Type', 'application/json')
//             .set('API-Key', process.env.jwt)
//         .expect('Content-Type', "text/html; charset=utf-8")
//         .expect(function(response) {
// 			expect(response.body).to.be.an('object');
// 		})
//         .end(done)
//     })
// })
// describe('GET order/wishlist', ()=>{
//     it('should be render wishlist', (done)=>{
//         request(app)
//             .get(`/${process.env.base_url}/wishlist`)
//             .set('Accept', 'application/json')
//             .set('Content-Type', 'application/json')
//             .set('API-Key', process.env.jwt)
//         .expect('Content-Type', "text/html; charset=utf-8")
//         .expect(function(response) {
// 			expect(response.body).to.be.an('object');
// 		})
//         .end(done)
//     })
// })