//라우터 모듈화 js
"use strict";

const express = require("express");
const router = express.Router();

const controller = require("./home.ctrl");

router.get("/", controller.output.main);
router.get("/login", controller.output.login);
router.get("/register", controller.output.register);

router.post("/login", controller.process.login);
router.post("/register", controller.process.register);
router.post("/getMenu", controller.process.getMenu);

module.exports = router;