"use strict";

const e = require("express");
const MenuStorage = require("./MenuStorage.js");

class Menu {
    constructor(body){
        this.body = body;
    }

    async getMenu(){
        const menu = this.body;

        const response = await MenuStorage.getMenu();
        console.log("result : "+JSON.stringify(response));
        return response;
    }

}

module.exports = Menu;