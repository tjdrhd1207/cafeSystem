"use strict";


const modal = (id) => {
    const zIndex = 1;
    const modal = document.getElementById(id);

    //모달 뒤 레이아웃
    const modalBg = document.createElement('div');
    modalBg.setAttribute("class", "menu-modify-modal");

    document.body.append(bg);

    //닫기 버튼 처리, 레이어와 모달 div 지우기
    
    modal.querySelector('.modal_close_btn').addEventListener('click', function(){
        bg.remove();
        modal.style.display = 'none';
    });

}

document.getElementById('menu-edit-btn').addEventListener("click", (e)=>{
    alert("하이");
    //modal('my_modal');
});

