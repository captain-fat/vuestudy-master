import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//获取token的值和用localStorage存储、删除本地token的值
export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token')?localStorage.getItem('token'):'',
    pageNum: localStorage.getItem('pageNum')?localStorage.getItem('pageNum'):'',
    userName: localStorage.getItem('userName')?localStorage.getItem('userName'):''
  },
  mutations: {
    setToken(state, token){
      state.token = token;
      localStorage.setItem("token", token.token)//存储token
    },
    delToken(state){
      state.token = '';
      localStorage.removeItem("token")//删除token
    },
    setPageNum(state, pageNum){
      state.pageNum = pageNum;
      localStorage.setItem('pageNum', pageNum.pageNum)
    },
    delPageNum(state){
      state.pageNum='';
      localStorage.removeItem("pageNum")
    },
    setUserName(state, userName){
      state.userName = userName;
      localStorage.setItem('userName', userName.userName)
    },
    delUserName(state){
      state.userName='';
      localStorage.removeItem("userName")
    }
  },
  actions: {
  },
  modules: {
  }
})
