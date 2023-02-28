import http from "../request/http"

//数据面板
export async function listComments(params){
   return   await  http.getRestApi('http://localhost:8081/comment/listAll',params);
   // return   await  http.get('http://localhost:8082/dataBoard',params);
}
//数据面板
export async function addComment(params){
   return   await  http.post('http://localhost:8081/comment/addComment',params);
}
//数据面板
export async function likeComment(params){
   return   await  http.getRestApi('http://localhost:8081/comment/likeComment',params);
}
//
//删除评论
export async function delComment(params){
   return   await  http.getRestApi('http://localhost:8081/comment/delComment',params);
}
//