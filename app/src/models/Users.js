"use strict";

const e = require("express");
const UserStorage = require("./UserStorage");

class User {
    constructor(body){
        this.body = body;

    }

    login(){
        const client = this.body;
        const {id, password} = UserStorage.getUserInfo(client.id);
      
        if(id){
            if(id === client.id && password === client.password){
                
                return { success : true };
            
            }else{

                return { success : false, msg : "비밀번호가 다릅니다." };
                
            }
        }
        
        return {succss : false, msg : "존재하지 않는 아이디입니다."};
    }

    register(){
        
        const client = this.body;
        const response = UserStorage.save(client);
        
        return response;
        
        
    }
}

module.exports = User;