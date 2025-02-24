import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:8080', //请求地址
    timeout: 60000, // 请求超时时间
    // headers: {
    // 	//设置后端需要的传参类型
    // 	'Content-Type': 'application/json',
    // },
});

// // 添加请求拦截器
request.interceptors.request.use(config => {
	// 如果你要去localStor获取token,(如果你有)
	// let token = localStorage.getItem("x-auth-token");
	// if (token) {
	//添加请求头
	//config.headers["Authorization"]="Bearer "+ token
	// }
	//打印请求
	console.log(config);
	return config
}, err => {
	return Promise.reject(err)
});

// 添加响应拦截器
request.interceptors.response.use(response => {
	return response.data
}, err => {
	return Promise.reject(err)
});

export default request