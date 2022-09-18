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
        
        findOverlapName(menus, menuInfo);

        menus.push(menuInfo);
        fs.writeFile("./src/databases/menu.json", JSON.stringify(menus));

        return { success : true };
    }

    static async updateMenu(menuInfo){

        const menus = await this.getMenu(true);
        
        console.log("menus 정보 : "+JSON.stringify(menus));
        findOverlapName(menus, menuInfo);

        //console.log("menus : "+menus);

        menus.filter((item)=>{
            if(item['id'] === menuInfo.id){ 
                
                item['name'] = menuInfo.name;
            } 
        });
        
        fs.writeFile("./src/databases/menu.json", JSON.stringify(menus));

        return { success : true };

    }

}

const findOverlapName = (menus, menuInfo) =>{
    
    menus.filter((item)=>{
        item['name'] === menuInfo.name ? callErr : null
    });

    
    const callErr = () =>{
        console.error("에러");
        //throw "이미 존재하는 메뉴입니다.";
    }
}

module.exports = MenuStorage;