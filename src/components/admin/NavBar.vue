<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-container>
      <el-header style="text-align: center; font-size: 12px; margin-top: 10px">
        <el-row>
          <el-col :span="3" style="text-align: center">
            <el-avatar size="large" :src="require('../../assets/logo.png')"></el-avatar>
          </el-col>
          <el-col :span="3" style="text-align: left">
            <el-tag>{{ userName }}</el-tag>
          </el-col>

          <el-col :span="12" :offset="6" style="text-align: right">
            <el-button type="primary" plain @click="exitLogin()">Exit</el-button>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
    <el-container style="border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238,241,246)">
        <el-menu>
          <el-menu-item-group>
            <el-menu-item @click="goTo('/admin/home')">
              <i class="el-icon-message"></i>
              Dashboard
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item @click="goTo('/admin/news')">
              <i class="el-icon-apple"></i>
              News Management
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item @click="goTo('/admin/user')">
              <i class="el-icon-box"></i>
              User Management
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item @click="goTo('/admin/course')">
              <i class="el-icon-brush"></i>
              Course Management
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item @click="goTo('/admin/question')">
              <i class="el-icon-umbrella"></i>
              Question Management
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item @click="goTo('/admin/exam')">
              <i class="el-icon-sunset"></i>
              Exam Management
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "NavBar",
  methods: {
    ...mapMutations(['delToken', 'setUserName', 'delUserName']),
    exitLogin() {
      const _this = this;
      _this.delToken({token: ''});
      _this.delUserName({userName:''});
      _this.$router.push('/admin/login')
    },
    goTo(path) {
      const _this = this;
      //跳转前增加判断避免报错
      if (this.$route.path !== path) {
        this.$router.replace(path)
      }
    }
  },
  created() {
    let userName = localStorage.getItem('userName')
    this.userName = userName;
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>