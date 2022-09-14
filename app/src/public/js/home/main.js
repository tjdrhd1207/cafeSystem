"use strict"

/* TODO 메뉴추가 기능

1. [o] 메뉴의 이름을 입력 받고 확인 버튼을 누르면 메뉴가 추가된다.
2. [o] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
   [x] -> 추가시 기존에 존재하는 메뉴인지 비동기로 조회하여 존재하는 메뉴면  `기존에 존재하는 메뉴입니다`라고 에러처리를 하여 표시한다.(메뉴 수정과 공통 기능)
3. [o] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
4. [o] 사용자 입력값이 빈 값이라면 추가되지 않는다.
5. [o] 메뉴 수정 시 모달창 호출해서 처리하기
6. [x] (design) 메뉴가 많아 졌을 때 뒤의 배경 container도 메뉴에 길이에 맞게 늘어나야함.

7. [] localStorage에 데이터를 저장하여 새로고침해도 데이터가 남아있게 한다.
8. [] 에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류별로 메뉴판을 관리할 수 있게 만든다.
9. [] 페이지에 최초로 접근할 때는 에스프레소가 메뉴가 먼저 보이게 한다.

TODO 품절 상태 관리
10. [] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out-class를 추가하여 상태를 변경한다.
11. [] 품절 버튼을 추가한다.
12. [] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
13. [] 품절 해당메뉴의 상태값이 페이지에 그려진다.
14. [] 클릭 이벤트에서 가장 가까운 li태그의 class 속성 값에 sold-out을 추가한다.

TODO localStoarge Read & Write
15. [o] localStorage에 데이터를 저장한다.
16. [o] 메뉴를 추가할 때
17. [o] 메뉴를 수정할 때
18. [o] 메뉴를 삭제할 때
19. [] localStorage에 있는 데이터를 읽어온다.

TODO 서버 요청 부분
1. [o] 웹 서버를 띄운다.
2. [] 서버에 새로운 메뉴가 추가될 수 있도록 요청한다.
3. [] 서버에서 카테고리별 메뉴리스트를 받아온다.
4. [] 서버에 메뉴가 수정될 수 있도록 요청한다.
5. [] 서버에서 메뉴의 품절상태를 토글될 수 있도록 요청한다.
6. [] 서버에 메뉴가 삭제될 수 있도록 요청한다.

//회고
// -'상태값'의 중요성
// -상태값을 사용해서 사용자 관점에서 페이지 렌더링이 될 때 페이지 렌더링이 어떻게 되는지


*/
import { $ } from './../utils/dom.js';
import store from './../store/main.js';

const BASE_URL = "http://localhost:3000/api";


const allItem = [];

function App(){

    this.menu = {
        espresso : [],
        frappuccino : [],
        blendid : [],
        tea : [],
        desert : []
    };

    this.currentCategory = 'espresso';

    this.init = () => {
        if(store.getLocalStorage() ){
            this.menu = store.getLocalStorage();
            console.log("메뉴 : "+this.menu);
            
        }
        render();
        initEventListener();
    }

    const displayItem = (data) =>{
        console.log("displayItem");
        
        const menuList = document.getElementById("menu-list");
        const allCount = data.length;
    
        $("#menu-count").innerHTML = `총 ${allCount} 개`;
    
        data.map((item, index)=>{
    
            const menuNameLi = document.createElement("li");
            const menuName = document.createElement("span");
            const menuPrice = document.createElement("span");
            
    
            menuNameLi.setAttribute("class", "menu-list-name");
            menuNameLi.setAttribute("data-menu-id",index);
            menuName.setAttribute("class", "menu-name");
            menuPrice.setAttribute("class", "menu-price");
    
            const coffee = {"name" : item.name, "price" : item.price};
    
            //this.menu.push(coffee);
            //store.setLocalStorage(this.menu);
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
    
    /* JSON데이터 읽어서 받아오는 부분 localStorage로 받아오는 것과 겹치기 때문에 일시적으로 주석처리
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
    loadStorage(); */

    const render = () => {
        const template = this.menu[this.currentCategory].map((item,index) => {
            return `
            <li data-menu-id="${index}" class="menu-list-name">
            <span class="menu-name ${item.soldOut ? 'sold-out' : "" }">${item.name}</span>
            <span class="menu-price">${item.price}원</span>
            <button class="menu-sold-out-btn" type="button">품절</button> 
            <button class="menu-edit-btn" >수정</button>
            <button class="menu-del-btn">삭제</button>
            </li>    
            `
        }).join("");
    
        $("#menu-list").innerHTML = template;
    
        updateMenuCount();
    }

    //메뉴 추가

        $(`#add_menu_btn`).addEventListener("click",(e)=>{

            const menu_input = $('#menu-name-input').value;
            const menu_price = $('#menu-price-input').value;
            
            if(!nullCheck(menu_input, menu_price)){
                return alert("메뉴와 가격을 입력하세요");
            }

            const coffee = {"name" : menu_input, "price" : menu_price, "soldOut" : false};    
            
            allItem.push(coffee);
            
            //this.menu[this.currentCategory].push(coffee);
            fetch(`/category/${this.currentCategory}/addMenu`, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({ name : menu_input, price : menu_price, category : this.currentCategory }),

            }).then((data)=>{
                console.log(data);
            }).then((res)=>{
                return res.json();
            });

            store.setLocalStorage(this.menu);
            e.preventDefault();
            //render();

            /* const menuTemplate = (e) => { return `
                                    <li data-menu-id="${index}" class="menu-list-name">
                                    <span class="menu-name">${e.name}</span>
                                    <span class="menu-price">${e.price}원</span>
                                    <button  class="menu-edit-btn" >수정</button>
                                    <button  class="menu-del-btn">삭제</button>
                                    </li>`   
            
            }; */

            //$("#menu-list").insertAdjacentHTML('beforeend',template);
            

            $('#menu-name-input').value = "";
            $('#menu-price-input').value = "";

            
        });
 

    const removeMenu = (e) =>{
        const menuId = e.target.closest("li").dataset.menuId;
        const $menu = e.target.closest("li");
        console.log("menuId :"+menuId);
        
            if(confirm("메뉴를 삭제하시겠습니까?")){
                /* $menu.remove(); */
                this.menu[this.currentCategory].splice(menuId, 1);
                store.setLocalStorage(this.menu);
                render();
            } 
           
    }

    const updateMenuName = (e) => {
    
        const menuId = e.target.closest("li").dataset.menuId
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
        
        this.menu[this.currentCategory][menuId].name = updatedMenuName;
        store.setLocalStorage(this.menu);
    
        if(updatedMenuName != null){
            render();
        }
    }
    
    const updateMenuCount = () => {
        //const 변수 = li 갯수를 카운팅
        //const menuCount = document.querySelectorAll("li").length;
    
        $("#menu-count").innerHTML = `총 ${this.menu[this.currentCategory].length} 개`;
    }
    
    const updateMenuPrice = (e) => {
        const $menuPrice = e.target.closest("li").querySelector(".menu-price");
        const updateMenuPrice = prompt("가격을 수정하세요", $menuPrice.innerText);
        if(updateMenuPrice != null){
            $menuPrice.innerText = updateMenuPrice+"원";
            /*render(); */
        }
        
    }
    
    const initEventListener = () =>{

        $("#menu-list").addEventListener("click", (e)=>{
    
            if(e.target.classList.contains("menu-edit-btn")){
                   updateMenuName(e);
                   return;
            }
        
            if(e.target.classList.contains("price-edit-btn")){
                updateMenuPrice(e);
                return;
            }
        
            if(e.target.classList.contains("menu-del-btn")){
                
                removeMenu(e);
        
                /* updateMenuCount(); */
                return;
            }
            
            if(e.target.classList.contains("menu-sold-out-btn")){
                soldOutMenu(e);
                
                return;
            }
        });
    }
    

    $(".cafe-type-navbar").addEventListener("click", (e)=>{
        const isCategoryButton = e.target.classList.contains("coffee-type");
        if(isCategoryButton){        
            const categoryName = e.target.dataset.categoryName;
            this.currentCategory = categoryName;
            $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`; 
            $("#menu-name-input").placeholder = `${e.target.innerText.substring(2, categoryName.length+1)} 메뉴 이름`;
            render();
        }
    });

    const soldOutMenu = (e) => {
       
        const menuId = e.target.closest("li").dataset.menuId;
        
        this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut ;
        store.setLocalStorage(this.menu);
        render();
    }

}


const nullCheck = (name, price) => {
    
    if(name.trim() === '' || price.trim() === ''){
        return false;
    }else{
        return true;
    }
}

const app = new App();

/* const loadedMenuData = () => {
    addMenu();

    //form 태그가 자동으로 전송되는걸 막아주도록 해야함.
    $("#menu-form").addEventListener("submit", (e)=>{
        e.preventDefault();
    }); 
}
 */
//loadedMenuData();

document.addEventListener("DOMContentLoaded", app.loadStorage);
app.init();
