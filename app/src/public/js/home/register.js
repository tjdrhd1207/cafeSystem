"use strict";

const $ = (selector) => document.querySelector(selector);

const id = $("#id-ipt");
const nameIpt = $("#name-ipt");
const password = $("#pwd-ipt");
const confirmPassword = $("#confirm-pwd-ipt");

const registerBtn = $("#registerBtn");

const register = (e) => {
    
    if(id.value.trim()===''){
        id.focus();
        return alert("아이디를 입력해주세요");
       
    }

    const req = {
        id : id.value,
        name : nameIpt.value,
        password : password.value,
        
    };

    console.log("req : "+JSON.stringify(req));
    //e.preventDefault();
    
    fetch("/register", {
        method : "POST",    //REST_API 메소드 
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(req),
    }).then((res) => res.json())
      .then((res) => {
        if(res.success){
            location.href = "/login";
        }else{
            alert(res.msg);
        }
      }).catch((err)=>{
        const name = $("");console.error(new Error("회원가입 중 에러 발생"
        ));
      })
     
}

let flag = true;

const checkPwd = (e) => {

    console.log(e.target.value);
    

    if(e.target.value !== password.value){

        if(!document.getElementById("pTag")){

        const tagDiv = document.createElement("p");
        const lableDiv = document.getElementById('confrim-div');    

        tagDiv.innerHTML = "비밀번호가 일치하지 않습니다.";
        tagDiv.setAttribute("class", "pTag");
        tagDiv.setAttribute("id", "pTag");

        lableDiv.appendChild(tagDiv);
        }
    }else{

        const tagDiv = document.getElementById("pTag");
        
        if(tagDiv){
            tagDiv.remove();
        }
    }

}


confirmPassword.addEventListener("blur", checkPwd);

registerBtn.addEventListener("click", register);

