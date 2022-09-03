//홈 컨트롤러
"use strict";

const User = require("../../models/Users");


const output = {
    main : (req, res) => {
        res.render("home/index");
    },
    
    login : (req, res)=>{
        res.render("home/login");
    },

    register : (req, res)=>{
        res.render("home/register");
    }
};



const process = {
    login : (req, res) => {
        //클라이언트가 입력한 정보를 가지고 User인스턴스화
        const user = new User(req.body);
        const response = user.login();
        return res.json(response);

    }
}


module.exports = {
   output,
   process,
};

