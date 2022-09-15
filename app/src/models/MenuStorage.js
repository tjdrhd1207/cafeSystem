"use strict";

const UserStorage = require("./UserStorage");

const fs = require("fs").promises;

class MenuStorage{

    static #getMenu(data, isAll){

        const menu = JSON.parse(data);
        
        if(isAll === true) return menu;
        
        const menuByCategory = [];
        
        menu.filter((item)=>{
            return item['category']===isAll ? menuByCategory.push(item) : null
        })
        
        return menuByCategory;
    }

    static getMenu(isAll){

        return fs
        .readFile("./src/databases/menu.json")
        .then((data)=>{
            
            return this.#getMenu(data, isAll);
        })
        .catch((err) => console.log(err));
    }

    static async addMenu(menuInfo){
        
        const menus = await this.getMenu(true);      
        
        menus.filter((item)=>{
            item['name']=== menuInfo.name ? callErr : null
        });

        const callErr = () =>{
            throw "이미 존재하는 메뉴입니다.";
        }
        menus.push(menuInfo);
        fs.writeFile("./src/databases/menu.json", JSON.stringify(menus));

        return { success : true };
    }

    static async updateMenu(menuInfo){

        const menus = await this.getMenu(menuInfo.category);

        console.log("update-menus : "+JSON.stringify(menus));

        /* menus.filter((item)=>{
            return item['id'] === menuInfo.id ? 
        }) */
    }

}

module.exports = MenuStorage;