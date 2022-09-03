"use srict";

const $ = (selector) => document.querySelector(selector);

const id = $("#id-ipt");
const password = $("#pwd-ipt");
const loginBtn = $("#button");

const login = (e) => {
    const req = {
        id : id.value,
        password : password.value,
    };

    fetch("/login", {
        method : "POST",    //REST_API 메소드 
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(req),
    }).then((res) => res.json())
      .then((res) => {
        if(res.success){
            location.href = "/";
        }else{
            alert(res.msg);
        }
      }).catch((err)=>{
        console.error(new Error("로그인 중 에러 발생"));
      })

}


loginBtn.addEventListener("click", login);

console.log(id);
