//홈 컨트롤러
"use strict";

const User = require("../../models/Users");
const Menu = require("../../models/Menu");

const output = {
    main : (req, res) => {
        res.render("home/index");
    },
    
    login : (req, res)=>{
        res.render("home/login");
    },

    register : (req, res)=>{
        res.render("home/register");
    },

    order : (req, res)=>{
        res.render("home/order");
    }
};



const process = {
    login : async(req, res) => {
        //클라이언트가 입력한 정보를 가지고 User인스턴스화
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);

    },

    register : async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },
    
    getMenu : async(req, res) => {
        const { category } = req.params;
        const menu = new Menu(req.body);
        const response = await menu.getMenu(category);
        
        return res.json(response);
    },

    addMenu : async(req, res) => {
        const { category } = req.params;
        const menu = new Menu(req.body);
        const response = await menu.addMenu(category);
        
        return res.json(response);
    },

    updateMenu : async(req, res) => {
        const { category } = req.params;
        const { id } = req.params;
        const menu = new Menu(req.body);
        const response = await menu.updateMenu(category, id);
        return res.json(response);
    },

    soldOut : async(req, res) => {
        const { category } = req.params;
        const { id } = req.params;
        const menu = new Menu(req.body);
        const response = await menu.toggleSoldOut(category, id);
        return res.json(response);
    },

    deleteMenu : async(req, res) => {
        const { id } = req.params;
        console.log("id : "+ id);
        const menu = new Menu(req.body);
        const response = await menu.deleteMenu(id);
        return res.json(response);

    }


}


module.exports = {
   output,
   process,
};

