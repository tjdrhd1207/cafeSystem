"use strict";

class UserStorage {
    // #변수 -> private하게 은닉화
    static #users = {
        id : ["jae", "min", "kim"],
        password : ["1234", "1234", "0000"],
        name : ["재민","민우","호종"],
    };

    static getInfo(...fields){
        const users = this.#users;
        /**reduce 반복문 */
        const newUsers = fields.reduce((newUsers, field)=>{
            //console.log(newUsers, field);
            if(users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        console.log(newUsers);
        //const info = { id : this.#users.id, password : this.#users.password};
        //return info;
        return ;
    }
}

module.exports = UserStorage;