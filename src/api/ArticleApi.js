import http from "../request/http"

//文章列表
export async function articleList(params){
   return   await  http.post('article/list',params);
}
export async function getArticleById(params){
   return   await  http.getRestApi('article',params);
}
export async function addArticle(params){
   return   await  http.post('article/post',params);
}

export async function edit(params){
   return   await  http.post('article/edit',params);
}

export async function delArticleById(params){
   return   await  http.getRestApi('article/delete',params);
}
export async function hotArticle(){
   return   await  http.get('article/hotArticle');
}
