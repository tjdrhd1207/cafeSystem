//라우터 모듈화 js
"use strict";

const express = require("express");
const router = express.Router();

const controller = require("./home.ctrl");

router.get("/", controller.output.main);
router.get("/login", controller.output.login);
router.get("/register", controller.output.register);
router.get("/order", controller.output.order);

router.post("/login", controller.process.login);
router.post("/register", controller.process.register);
router.post("/category/:category/getMenu", controller.process.getMenu);
router.post("/category/:category/addMenu", controller.process.addMenu);
router.put("/category/:category/id/:id/updateMenu", controller.process.updateMenu);
router.put("/category/:category/id/:id/soldOut", controller.process.soldOut);
router.post("/uuid/:id/deleteMenu", controller.process.deleteMenu);
router.post("/")

module.exports = router;