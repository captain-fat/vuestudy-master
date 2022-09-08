import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/admin/Home.vue'
import Stock from "../views/Stock";
import Login from "../views/admin/Login";
import Register from "@/views/admin/Register";
import Test from "@/views/Test";
import NavBar from "@/components/admin/NavBar";
import News from "@/views/admin/News";
import User from "@/views/admin/User";
import Course from "@/views/admin/Course";
import Question from "@/views/admin/Question";
import Exam from "@/views/admin/Exam";
import NewsUpdate from "@/views/admin/NewsUpdate";



Vue.use(VueRouter)

const routes = [
    {
        path: '/admin',
        name: 'Home',
        component: NavBar,
        children: [{
            path: '/admin/home',
            name: 'Dashboard',
            component: Home,
        }, {
            path: '/admin/news',
            name: 'News',
            component: News,
        },{
            path: '/admin/news/update',
            name: 'News',
            component: NewsUpdate
        },{
            path: '/admin/user',
            name: User,
            component: User
        },{
            path: '/admin/course',
            name: Course,
            component: Course
        },{
            path: '/admin/question',
            component: Question,
            name:Question
        },{
            path: '/admin/exam',
            component: Exam,
            name:Exam
        }
        ]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/stock',
        component: Stock
    },
    {
        path: '/admin/login',
        component: Login
    },
    {
        path: '/admin/register',
        component: Register
    },
    {
        path: '/test',
        component: Test
    }
]


const router = new VueRouter({
    routes,
    mode: 'history'
})

// router.beforeEach((to, from, next) => {
//     //设立需要检查是否登录的页面名称, 通过Name属性识别
//     const nextRoute = ['Home', 'Dashboard', 'News', 'User', 'Course', 'Question',
//     'Exam']
//     if (to.path === '/admin/login') {//若要跳转的页面是登录界面
//         next();//直接跳转
//     } else if (nextRoute.indexOf(to.name) >= 0) {//若要跳转的页面是个人界面
//         let token = localStorage.getItem('token');//获取本地存储的token值
//         if (token === null || token === '') {//若token为空则验证不成功，跳转到登录页面
//             next('/admin/login')
//         } else {//不为空则验证成功
//             next();
//         }
//     } else {
//         next();
//     }
// });

router.beforeEach((to, from, next) => {
    //设立需要检查是否登录的页面名称, 通过Name属性识别
    const nextRoute = ['Home', 'Dashboard', 'News', 'User', 'Course', 'Question',
    'Exam']
    if (to.path === '/admin/login') {//若要跳转的页面是登录界面
        next();//直接跳转
    } else if (nextRoute.indexOf(to.name) >= 0) {//若要跳转的页面是个人界面
        let token = localStorage.getItem('token');//获取本地存储的token值
        if (token === null || token === '') {//若token为空则验证不成功，跳转到登录页面
            next('/admin/login')
        }
        axios.post('http://localhost:8081/user/checkToken', token).then(function (resp){
            if (resp.data === true){
                next()
            }else {
                next('/admin/login')
            }
        });
    } else {
        next();
    }
});



export default router
