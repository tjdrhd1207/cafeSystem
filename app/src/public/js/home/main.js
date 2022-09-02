"use strict"


const $ = (selector) => document.querySelector(selector);

const allItem = [];

const index = () => {
    //form 태그가 자동으로 전송되는걸 막아주도록 해야함.
    $("#menu-form").addEventListener("submit", (e)=>{
        e.preventDefault();
    }); 


    $(`#add_menu_btn`).addEventListener("click",()=>{

        const menu_input = $('#menu-name-input').value;
        const menu_price = $('#menu-price-input').value;
    
        const coffee = {"name" : menu_input, "price" : menu_price};    
        
        allItem.push(coffee);
        console.log(allItem);
        const menuTemplate = (e) => { return `
                                   <li>
                                   <span>${e.name}</span>
                                   <span>${e.price}</span>
                                   <button type="button">수정</button>
                                   <button type="button">삭제</button>
                                   </li>`   
        
        };

            $("#menu-list").insertAdjacentHTML('beforeend',menuTemplate(coffee));
        
    });
    console.log("하이");
    //console.log(searchDetail);
  
}

const checkMenu = () => {

}

index();