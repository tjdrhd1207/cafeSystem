"use strict";

const e = require("express");
const MenuStorage = require("./MenuStorage.js");
const { v4: uuidv4 } = require("uuid");



class Menu {

    constructor(body){
        this.id = uuidv4();
        this.name = body.name;
        this.category = body.category;
        this.price = body.price;
        this.isSoldOut = false;
    }

    async getMenu(category){
        const menu = category;
        const response = await MenuStorage.getMenu(menu);
        return response;
    }

    async addMenu(category){
        const menu = {id: this.id, name : this.name, category: category, price : this.price, isSoldOut : this.isSoldOut};

        try{
            const response = await MenuStorage.addMenu(menu);
            //console.log("response : "+JSON.stringify(response));
            return response;
        }catch(err){
            const result = { success : false, msg : err};
            console.error(new Error("메뉴 삽입 실패"));

            return result;
        }
    }

    async updateMenu(category, id){
        console.log("cate : "+category+", id : "+id);
        const menu = { id: id, name : this.name, category: category};

        try{
            console.log("upMenu : "+JSON.stringify(menu));
            const response = await MenuStorage.updateMenu(menu);

            return response;
        }catch(err){

        }
    }

}

module.exports = Menu;