const auth = require('../routes/auth.js');
const dotenv = require("dotenv");
const base_url = process.env.base_url;
const secretKey = process.env.secretKey;
const request = require('supertest');
const express = require('express');
const app = express();
const expect = require('chai').expect;
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/auth/signin', auth);
app.use('/auth/signup', auth);

describe("given username and password", () => {
	//should respond with a json object containing user info
	test("response has userId", async () => {
		const response = await request(app).post("/auth/signin").send({
		  username: "mehmet4",
		  password: "mehmet4"
		})
		expect(response.body.user).toBeDefined()
	})
});
// describe("POST /auth/signin", () => {
// 	it('Should be signed in and return user info object', function (done) {
// 		request(app)
// 			.post(`/${process.env.base_url}/auth/signin`)
// 			.set('Accept', 'application/json')
// 			.set('Content-Type', 'application/json')
// 			.send({ 
// 				secretKey: process.env.secretKey, 
// 				email: "mehmet4", 
// 				password: "mehmet4" 
// 			})
// 		.expect('Content-Type', "text/html; charset=utf-8")
// 		.expect(function(response) {
// 			expect(response.body).to.be.an('object');
// 		})
// 		.end(done);
// 	});
// });

// describe("POST /auth/signup", () => {
// 	it('Should signup properly', function (done) {
// 		request(app)
// 			.post(`/${process.env.base_url}/auth/signup`)
// 			.set('Accept', 'application/json')
// 			.set('Content-Type', 'application/json')
// 			.send({ 
// 				secretKey: process.env.secretKey,
//                 name: "mehmetTEST", 
// 				email: "mehmetTEST", 
// 				password: "mehmetTEST" 
// 			})
// 		.expect('Content-Type', "text/html; charset=utf-8")
// 		.expect(function(response) {
// 			expect(response.body).to.be.an('object');
// 		})
// 		.end(done);
// 	});
// });