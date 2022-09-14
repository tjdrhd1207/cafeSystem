"use strict";

const e = require("express");
const MenuStorage = require("./MenuStorage.js");

class Menu {
    constructor(body){
        
        this.name = body.name;
        this.category = body.category;
        this.price = body.price;
        this.isSoldOut = false;
    }

    async getMenu(){
        const menu = this.body;

        const response = await MenuStorage.getMenu();
        console.log("result : "+JSON.stringify(response));
        return response;
    }

    async addMenu(category){
        const menu = {name : this.name, category: category, price : this.price, isSoldOut : this.isSoldOut};
        //console.log("menu body : "+JSON.stringify(menu));

        try{
        const response = await MenuStorage.addMenu(menu);
        console.log("response : "+response);
        return response;
        }catch(err){
            const result = { success : false, msg : err};
            console.log("에러");

            return result;
        }
    }

}

module.exports = Menu;