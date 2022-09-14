"use strict";

const UserStorage = require("./UserStorage");

const fs = require("fs").promises;

class MenuStorage{

    static #getMenu(data, isAll){

        const menu = JSON.parse(data);
        
        if(isAll) return menu;


        return menu;
    }

    static getMenu(isAll){

        return fs
        .readFile("./src/databases/menu.json")
        .then((data)=>{
            console.log("data : "+data);
            return this.#getMenu(data, isAll);
        })
        .catch((err) => console.log(err));
    }

    static async addMenu(menuInfo){
        
        const menus = await this.getMenu(true);      
        

        if(menus.name.includes(menuInfo.name)){
            throw "이미 존재하는 메뉴입니다.";
        }

        //데이터 추가
        menus.name.push(menuInfo.name);
        menus.category.push(menuInfo.category);
        menus.price.push(menuInfo.price);
        menus.isSoldOut.push(menuInfo.isSoldOut);

        console.log("메뉴 : "+JSON.stringify(menus));

        fs.writeFile("./src/databases/menu.json", JSON.stringify(menus));

        return { success : true };
    }







}

module.exports = MenuStorage;