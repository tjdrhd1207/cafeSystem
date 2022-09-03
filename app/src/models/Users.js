"use strict";

const e = require("express");
const UserStorage = require("./UserStorage");

class User {
    constructor(body){
        this.body = body;

    }

    login(){
        const body = this.body;
        const {id, password} = UserStorage.getUserInfo(body.id);
      
        if(id){
            if(id === body.id && password === body.password){
                return { success : true };
            }else{
                
                return { success : false, msg : "비밀번호가 다릅니다." };
                
            }
        }
        
        return {succss : false, msg : "존재하지 않는 아이디입니다."};
    }
}

module.exports = User;