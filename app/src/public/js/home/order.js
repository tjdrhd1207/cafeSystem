"use strict"

/* 
1. getMenu의 메뉴 리스트 조회해서 dislay
2. 첫화면에서 모든메뉴 조회

Next todo

1. 메뉴 조회된 response 응답 front로 출력

*/
import MenuApi from "../api/index.js";

function Order(){

    console.log("시작");

    this.menu = {

    };
    
    this.currentCategory = 'espresso';

    this.init = async() =>{
        this.menu = await MenuApi.getAllMenuByCategory('all');

        console.log(this.menu);
       /*  render(); */
    }
}

const app = new Order();

/* document.addEventListener("DOMContentLoaded", app.loadStorage); */
app.init();