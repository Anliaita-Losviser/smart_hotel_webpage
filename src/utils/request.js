import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:8080', //请求地址
    timeout: 60000, // 请求超时时间
    headers: {//设置后端需要的传参类型
		'Content-Type': 'application/json',
		'token':'eyJhbGciOiJIUzI1NiJ9.eyJlbXBJZCI6MjgyODU5OTUwMjIzMzk2ODY0LCJleHAiOjE3NDU1NzEyOTB9.S_n2VDxfRZE-xz_tsQ3YWlDUMA2kamGtPjTtKi85UXM'
    },
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
	console.log("发出请求")
	console.log(config)
	return config
}, err => {
	console.log("请求发送出错")
	console.log(err)
	return Promise.reject(err)
});

// 添加响应拦截器
request.interceptors.response.use(response => {
	console.log("收到响应")
	console.log(response)
	return response
}, err => {
	console.log("响应接收出错")
	console.log(err)
	return Promise.reject(err)
});

export default request