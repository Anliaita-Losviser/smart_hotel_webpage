import request from "./axiosConfig";

//发送get请求
export function httpGet({
    url,
    params = {}
}) {
    return new Promise((resolve, reject) => {
        request.get(url, {
            params
        }).then((res) => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })

}
//发送post请求
export function httpPost({
    url,
    data = {},
    params = {}
}) {
    return new Promise((resolve, reject) => {
        request.post({
            url,
            // transformRequest: [function (data) {
            //     let ret = ''
            //     for (let it in data) {
            //         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            //     }
            //     return ret
            // }],
            // 发送的数据
            data,
            // url参数
            params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err);
        });
    })

}

export default {
    httpGet,
    httpPost,
}
