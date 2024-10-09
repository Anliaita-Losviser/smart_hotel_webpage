import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import floorManage from '@/views/hotelManagement/floorManage.vue'
import roomsManage from '@/views/hotelManagement/roomsManage.vue'
import typeOfRoom from '@/views/hotelManagement/typeOfRoom.vue'
import characterManage from '@/views/systemManagement/characterManage.vue'
import employeeManage from '@/views/systemManagement/employeeManage.vue'

const routes = [
    {path: '/', redirect:'/home'},
    { path: '/home', name:"home",component: HomePage,
        meta:{
            title:'首页',
        },
        // children:[{
        //     path: '/home', name:"home",component: HomePage,
        //     meta:{
        //         title:'仪表盘',
        //     }
        // }]
    },
    {
        path: '/hotelManagement', 
        name:"hotelManagement",
        redirect:'/roomsManage',
        meta:{
            title:'酒店管理',
        },
        children:[
            {path: '/floorManage',name:"floorManage",component: floorManage,
                meta:{
                    title:'楼层管理',
                },
            },
            {path: '/roomsManage',name:"roomsManage",component: roomsManage,
                meta:{
                    title:'房间管理',
                },
            },
            {path: '/typeOfRoom',name:"typeOfRoom",component: typeOfRoom,
                meta:{
                    title:'房间类型',
                },
            },
        ]
    },
    {
        path: '/systemManagement', 
        name:"systemManagement",
        redirect:'/employeeManage',
        meta:{
            title:'系统管理',
        },
        children:[
            {path: '/characterManage',name:"characterManage",component: characterManage,
                meta:{
                    title:'角色管理',
                },
            },
            {path: '/employeeManage',name:"employeeManage",component: employeeManage,
                meta:{
                    title:'员工管理',
                },
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router