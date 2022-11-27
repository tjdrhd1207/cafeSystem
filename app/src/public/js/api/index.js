
const BASE_URL = "http://localhost:3000/api";


    const MenuApi = {
        async getAllMenuByCategory(category){
            
            const response = await fetch(`/category/${category}/getMenu`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({category : this.currentCategory}),
            }).then((res)=>res.json())
            .catch((err)=>{
                console.error(new Error("메뉴 불러오기 중 에러 발생"));
            });
            
            return response;
        },

        async createMenu(menu){
            const response = fetch(`/category/${menu.category}/addMenu`, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(menu),

            }).then((res)=>
                res.json())
            .then((res)=> {if(res.code == 200){
                alert("하이");
            }}).
            catch((err)=>{
                console.log("err : "+err);
                alert(new Error("메뉴 등록 실패"));
            });
        },

        async updateMenu(menu){
            const response = fetch(`/category/${menu.category}/id/${menu.id}/updateMenu`, {
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(menu),
            
            }).then((res)=>res.json())
            .catch((err)=>{
                alert(new Error("메뉴 수정 실패"));
            });
        },

        async toggleSoldOutMenu(menu){
            const response = fetch(`/category/${menu.category}/id/${menu.id}/soldOut`,{
                method : "PUT",
                headers : {
                    "Content-Type" : "applcation/json",
                },
                body : JSON.stringify(menu),
            }).then((res)=>res.json())
            .catch((err)=>{
                alert(new Error("메뉴 수정 실패"));
            });   
        },

        async deleteMenu(menuId){
            const response = fetch(`/uuid/${menuId}/deleteMenu`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
            }).then((res)=> res.json())
            .catch((err)=>{
                alert(new Error("메뉴 수정 실패"));
            });
        }
    }

    export default MenuApi;