"use strict";

class UserStorage {
    // #변수 -> private하게 은닉화
    static #users = {
        id : ["jae", "min", "kim"],
        password : ["1234", "1234", "0000"],
        name : ["재민","민우","호종"],
    };

    static getUsers(...fields){
        const users = this.#users;
        /**reduce 반복문 */
        const newUsers = fields.reduce((newUsers, field)=>{
            
            if(users.hasOwnProperty(field)){
            
                newUsers[field] = users[field];
            }
            return newUsers;
        
        }, {});
        
        return newUsers;
    }

    static getUserInfo(id){
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users);   // => [id, password, name]
        const userInfo = usersKeys.reduce((newUser, info)=>{
            newUser[info] = users[info][idx];
            return newUser;
        }, {});

        return userInfo;
    }
}

module.exports = UserStorage;