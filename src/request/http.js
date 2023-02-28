
import axios from 'axios'
import qs from 'qs'

//加载状态
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import {ElMessage} from "element-plus";




// create an axios instance
const service = axios.create({
        baseURL:"http://localhost:8081/",
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000 // request timeout
})

// request interceptor
//请求发送之前的拦截器
service.interceptors.request.use(
    config => {
        NProgress.start()
        // Loading
        // console.log('发送请求之前')
        // console.log(config)
        // do something before request is sent
        //如果token存在，把token添加到请求的头部
        // NProgress.start()
        const token = localStorage.getItem('access_token')
        if (token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            // console.log(token)

            config.headers.token = token
            // console.log(  config.headers.token)
        }
        return config
    },
    error => {
        ElMessage.error("请求失败")
        NProgress.done()
        // do something with request error
        console.log("哈哈哈哈",error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
//请求返回之后的处理
service.interceptors.response.use(

    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        NProgress.done()
        const res = response.data
        if (res.code == 200 ){
            if (res.msg) {
                // ElMessage.success(res.msg)
            }
        }
        if (res.code == 500){
            ElMessage.error(res.msg)
        }
        if (res.code == -999){
            ElMessage.error(res.msg)
        }

        return res;

    },
    error => {
        ElMessage.error("响应失败")

        NProgress.done()
        console.log('err' + error) // for debug

        return Promise.reject(error)
    }
)

//请求方法
const http = {
    loginPost(url, params,headers) {
        return service.post(url, params, {
            transformRequest: [(params) => {
                return qs.stringify(params)
            }],
            headers: headers,
        })
    },
    post(url, params) {
        return service.post(url, params, {
            transformRequest: [(params) => {
                return JSON.stringify(params)
            }],
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    put(url, params) {
        return service.put(url, params, {
            transformRequest: [(params) => {
                return JSON.stringify(params)
            }],
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    //parm =>  {id:10}
    // http://localhost:8089/api/user?id=10
    get(url, params) {
        return service.get(url, {
            params: params,

        })
    },
    //parm =>  {id:10}
    // http://localhost:8089/api/user/10
    getRestApi(url, params) {
        let _params
        if (Object.is(params, undefined || null)) {
            _params = ''
        } else {
            _params = `/${params}`
            // for (const key in params) {
            //   console.log(key)
            //   console.log(params[key])
            //   // eslint-disable-next-line no-prototype-builtins
            //   if (params.hasOwnProperty(key) && params[key] !== null && params[key] !== '') {
            //     _params += `/${params[key]}`
            //   }
            // }
            //去掉参数最后一位?
            // _params = _params.substr(0, _params.length - 1)
        }
        console.log(_params)
        if (_params) {
            return service.get(`${url}${_params}`)
        } else {
            return service.get(url)
        }
    },
    //parm =>  {id:10}
    // http://localhost:8089/api/user/10
    delete(url, params) {
        let _params
        if (Object.is(params, undefined || null)) {
            _params = ''
        } else {
            _params = '/'
            for (const key in params) {
                // eslint-disable-next-line no-prototype-builtins
                if (params.hasOwnProperty(key) && params[key] !== null && params[key] !== '') {
                    _params += `${params[key]}/`
                }
            }
            //去掉参数最后一位?
            _params = _params.substr(0, _params.length - 1)
        }
        if (_params) {
            return service.delete(`${url}${_params}`).catch(err => {
                // message.error(err.msg)
                return Promise.reject(err)
            })
        } else {
            return service.delete(url).catch(err => {
                // message.error(err.msg)
                return Promise.reject(err)
            })
        }
    },
    upload(url, params) {
        return service.post(url, params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}
export default http
