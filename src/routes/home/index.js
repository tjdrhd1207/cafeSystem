//라우터 모듈화 js
"use strict";

const express = require("express");
const router = express.Router();

const controller = require("./home.ctrl");

router.get("/", controller.main);
router.get("/login", controller.login);

module.exports = router;