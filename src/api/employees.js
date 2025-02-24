import request from "@/utils/request.js";

//请求元路径
const empManageUrl = "/admin/employee";

//发送登陆请求
export function login(data) {
    return new Promise((resolve, reject) => {
        request.post(empManageUrl+"/login",
            data
        ).then((res) => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })

}
//发送退出登陆请求
export function logout() {
    return new Promise((resolve, reject) => {
        request.post(
            empManageUrl+"/logout",
        ).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err);
        });
    })

}

