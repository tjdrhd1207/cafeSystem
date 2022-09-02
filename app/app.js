"use strict";

//모듈
const express = require("express");
const bodyParser = require("body-parser"); 
const app = express();

//라우팅
const home = require("./src/routes/home");

//미들웨어 스태틱 경로설정
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({extended : true}));

//앱 세팅
app.set("views","./src/views");
app.set("view engine", "ejs");

//use -> 미들웨어 등록하는 메소드
app.use("/", home);

module.exports = app;