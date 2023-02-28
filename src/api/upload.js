import http from "../request/http"

//数据面板
export async function upload(params){
    return   await  http.upload('upload',params);
}
