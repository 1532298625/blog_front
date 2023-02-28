import http from "../request/http"

//数据面板
export async function loadTags(){
   return   await  http.get('tags/loadall');
}

