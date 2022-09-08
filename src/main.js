import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//请求拦截器
axios.interceptors.request.use(config =>{
  //判断是否存在token，如果存在将每个页面的header都添加token
  if (store.state.token){

    config.headers.common['XX-Token']=store.state.token   //此处的XX-Token要根据登录接口中请求头的名字来写
  }
  return config;
}),error =>{
  // 请求错误
  return Promise.reject(error);
}

//respone拦截器
axios.interceptors.response.use(
    response => {
      return response;
    },

    error => {  //默认除了2XX之外都为错误
      if(error.response){
        switch(error.response.status){
          case 401:
            this.$store.commit('delToken');
            router.replace({ //跳转到登录页面
              path: '/login',
              query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            });
        }
      }
      return Promise.reject(error.response);
    }
);

