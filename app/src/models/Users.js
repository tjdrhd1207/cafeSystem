"use strict";

const e = require("express");
const UserStorage = require("./UserStorage");

class User {
    constructor(body){
        this.body = body;

    }

    async login(){
        const client = this.body;
       
        const {id, password} = await UserStorage.getUserInfo(client.id);

        console.log(id);

        if(id){
            if(id === client.id && password === client.password){
                
                return { success : true };
            
            }else{

                return { success : false, msg : "비밀번호가 다릅니다." };
                
            }
        }
        
        return {succss : false, msg : "존재하지 않는 아이디입니다."};
    }

    async register(){
        const client = this.body;
        
        try{    
            const response = await UserStorage.save(client);
            return response;
        } catch(err){
            const result = { success : false, msg : err};
            console.error(new Error("이미 존재하는 아이디입니다."));

            return result;
        }

        
        
    }
}

module.exports = User;