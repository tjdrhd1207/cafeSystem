"use strict";

const fs = require("fs").promises;

class UserStorage {
    // #변수, 메소드 -> private하게 은닉화
    static #getUserInfo(data, id){
        const users = JSON.parse(data);

            const idx = users.id.indexOf(id);
            const usersKeys = Object.keys(users);   // => [id, password, name]
            const userInfo = usersKeys.reduce((newUser, info)=>{
                newUser[info] = users[info][idx];
                return newUser;
            }, {});
            
            console.log(userInfo);

            return userInfo;
    }

    static #getUsers(data, isAll, fields){
        /**reduce 반복문 */
        const users = JSON.parse(data);

        if (isAll) return users;

        const newUsers = fields.reduce((newUsers, field)=>{
            
            if(users.hasOwnProperty(field)){
            
                newUsers[field] = users[field];
            }
            return newUsers;
        
        }, {});
        return newUsers;

    }

    static getUsers(isAll, ...fields){
    
        return fs
        .readFile("./src/databases/user.json")
        .then((data)=>{
          return this.#getUsers(data, isAll, fields);
        })
        .catch((err) => console.log(err));

    }

    static getUserInfo(id){
        //const users = this.#users;
        return fs
          .readFile("./src/databases/user.json")
          .then((data)=>{
            return this.#getUserInfo(data, id);
          })
          .catch((err) => console.log(err));
        
    }

    

    static async save(userInfo){

        const users = await this.getUsers(true);
        console.log("유저 : "+JSON.stringify(users));
        //fs.appendFile("./src/databases/user.json", data);
        
        if(users.id.includes(userInfo.id)){
          
           throw "이미 존재하는 아이디입니다.  ";
        }

        //데이터 추가
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.password.push(userInfo.password);

        fs.writeFile("./src/databases/user.json", JSON.stringify(users));

        return { success : true };
    }
}

module.exports = UserStorage;