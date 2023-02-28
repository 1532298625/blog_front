import http from "../request/http"

//数据面板
export async function loadCategories(){
   return   await  http.get('category/loadall');
}

