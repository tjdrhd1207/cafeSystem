"use strict";

const fs = require("fs").promises;

class MenuStorage{

    static #getMenu(data){

        const menu = JSON.parse(data);
        
        return menu;
    }

    static getMenu(){

        return fs
        .readFile("./src/databases/menu.json")
        .then((data)=>{
            
            return this.#getMenu(data);
        })
        .catch((err) => console.log(err));

    }








}

module.exports = MenuStorage;