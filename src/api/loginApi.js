import http from "../request/http"

//数据面板
export async function register(params){
   return   await  http.post('user/register',params);
   // return   await  http.get('http://localhost:8082/dataBoard',params);
}
export async function getCode(params){
   return   await  http.post('user/getcode',params);
   // return   await  http.get('http://localhost:8082/dataBoard',params);
}

export async function login(params){
   return   await  http.post('user/login',params);

   // return   await  http.get('http://localhost:8082/dataBoard',params);
}

export async function logout(){
   return   await  http.get('user/logout');
}

export async function changePassword(password){
   return   await  http.post('user/changePassword',{password});
}

export async function changeInfo(info){
   return   await  http.post('user/changeInfo',info);
}

export async function getUser(){
   return await  http.get('user/info');
}


