import request from "@/utils/request.js";

/**
 * 请求元路径
 * @type {string}
 */
const empManageUrl = "/admin/employee";

/**
 * 发送登陆请求
 * @returns {Promise<unknown>}
 * @param body
 */
export function login(body) {
    return new Promise((resolve, reject) => {
        request.post(empManageUrl+"/login",
            body
        ).then((res) => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 发送退出登陆请求
 * @returns {Promise<unknown>}
 */
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

/**
 * 新增员工
 * @returns {Promise<unknown>}
 * @param body
 */
export function addNewEmployee(body) {
    return new Promise((resolve, reject) => {
        request.post(
            empManageUrl,
            body
        ).then((res) => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 员工分页查询
 * @returns {Promise<unknown>}
 */
export function page(var_name,var_page,var_pageSize) {
    return new Promise((resolve, reject) => {
        request.get(
            empManageUrl+"/page",{
            params:{
                name:var_name,
                page:var_page,
                pageSize:var_pageSize,
                }
            }
        ).then((res) => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 启用或禁用账号
 * @param var_id
 * @param var_status
 * @returns {Promise<unknown>}
 */
export function startOrStop(var_id,var_status) {
    return new Promise((resolve, reject) => {
        request.post(
            empManageUrl+`/status/${var_status}`,{},{
                params:{
                    id:var_id,
                }
            }
        ).then((res) => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 跟据ID查询员工
 * @param var_id
 * @returns {Promise<unknown>}
 */
export function getById(var_id) {
    return new Promise((resolve, reject) => {
        request.get(
            empManageUrl+`/${var_id}`
        ).then((res) => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 编辑员工信息
 * @param body
 * @returns {Promise<unknown>}
 */
export function update(body){
    return new Promise((resolve, reject) => {
        request.put(
            empManageUrl,
            body
        ).then((res) => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 修改密码
 * @param body
 * @returns {Promise<unknown>}
 */
export function editPassword(body) {
    return new Promise((resolve, reject) => {
        request.put(
            empManageUrl+"/editPassword",
            body
        ).then((res) => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}