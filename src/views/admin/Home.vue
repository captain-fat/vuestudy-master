<template>
  <div class="home">
    <HelloWorld/>
<!--    <img alt="Vue logo" src="src/assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--    <el-form>-->
<!--      <el-form-item>-->
<!--        <el-button type="primary" @click="exitLogin()">Exit</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
// import {mapMutations} from 'vuex';
export default {
  name: 'Home',

  components: {
    HelloWorld,
  },
  methods:{
    //退出按钮实现方法
    // ...mapMutations(['delToken']),
    // exitLogin(){
    //   const _this = this;
    //   _this.delToken({token:''});
    //   _this.$router.push('/admin/login')
    // }
  }
}
</script>
