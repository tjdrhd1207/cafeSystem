"use strict"

/* TODO 메뉴추가 기능

1. [o] 메뉴의 이름을 입력 받고 확인 버튼을 누르면 메뉴가 추가된다.
2. [o] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
   [x] -> 추가시 기존에 존재하는 메뉴인지 비동기로 조회하여 존재하는 메뉴면  `기존에 존재하는 메뉴입니다`라고 에러처리를 하여 표시한다.(메뉴 수정과 공통 기능)
3. [o] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
4. [o] 사용자 입력값이 빈 값이라면 추가되지 않는다.
5. [x] 메뉴 수정 시 모달창 호출해서 처리하기
6. [x] (design) 메뉴가 많아 졌을 때 뒤의 배경 container도 메뉴에 길이에 맞게 늘어나야함.

 */
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

        if(!nullCheck(menu_input, menu_price)){
            return alert("메뉴와 가격을 입력하세요");
        }

        const coffee = {"name" : menu_input, "price" : menu_price};    
        
        allItem.push(coffee);
        console.log(allItem);
        const menuTemplate = (e) => { return `
                                   <li class="menu-list-name">
                                   <span>${e.name}</span>
                                   <span>${e.price}원</span>
                                   <button  class="menu-edit-btn" >수정</button>
                                   <button  class="menu-del-btn">삭제</button>
                                   </li>`   
        
        };

        $("#menu-list").insertAdjacentHTML('beforeend',menuTemplate(coffee));
        
        $('#menu-name-input').value = "";
        $('#menu-price-input').value = "";

        updateMenuCount();
    });

}

const nullCheck = (name, price) => {
    
    if(name.trim() === '' || price.trim() === ''){
        return false;
    }else{
        return true;
    }
}



const loadStorage = () =>{

    fetch("/getMenu",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        }
        
    }).then((res) => res.json())
      .then(data=>{
        displayItem(data);
      })
      .catch((err)=> console.log(err));

}

const displayItem = (data) =>{
    
    const menuList = document.getElementById("menu-list");
    const allCount = data.length;

    $("#menu-count").innerHTML = `총 ${allCount} 개`;

    data.map((item)=>{

        const menuNameLi = document.createElement("li");
        const menuName = document.createElement("span");
        const menuPrice = document.createElement("span");
        
        menuNameLi.setAttribute("class", "menu-list-name");
        menuName.setAttribute("class", "menu-name");
        menuPrice.setAttribute("class", "menu-price");

        menuName.innerText = item.name;
        menuPrice.innerText = item.price+"원";

        //console.log(menuName+", "+menuPrice);

        menuNameLi.appendChild(menuName);
        menuNameLi.appendChild(menuPrice);
        
        
        menuList.appendChild(menuNameLi);
        
        const modifyMenuBtn = document.createElement("button");
        const modifyPriceBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        
        modifyMenuBtn.setAttribute("class", "menu-edit-btn");
        modifyPriceBtn.setAttribute("class", "price-edit-btn");
        deleteBtn.setAttribute("class", "menu-del-btn");

        modifyMenuBtn.innerHTML = "수정(메뉴)";
        modifyPriceBtn.innerHTML = "수정(가격)";
        deleteBtn.innerHTML = "삭제";

        
        menuNameLi.appendChild(modifyMenuBtn);
        menuNameLi.appendChild(modifyPriceBtn);
        menuNameLi.appendChild(deleteBtn);

    });    

    
}

document.addEventListener("DOMContentLoaded", loadStorage);

$("#menu-list").addEventListener("click", (e)=>{
    if(e.target.classList.contains("menu-edit-btn")){
        
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
        if(updatedMenuName != null){
            $menuName.innerText = updatedMenuName;
        }

    }
    if(e.target.classList.contains("price-edit-btn")){

        const $menuPrice = e.target.closest("li").querySelector(".menu-price");
        const updateMenuPrice = prompt("가격을 수정하세요", $menuPrice.innerText);
        if(updateMenuPrice != null){
            $menuPrice.innerText = updateMenuPrice+"원";
        }
    }

    if(e.target.classList.contains("menu-del-btn")){
        
        const $menu = e.target.closest("li");

        if(confirm("메뉴를 삭제하시겠습니까?")){
            $menu.remove();
        }

        updateMenuCount();
    }
    
})


const updateMenuCount = () => {
        //const 변수 = li 갯수를 카운팅
        const menuCount = document.querySelectorAll("li").length;

        $("#menu-count").innerHTML = `총 ${menuCount} 개`;
}

index();

