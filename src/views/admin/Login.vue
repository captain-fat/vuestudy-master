<template>

  <div style="margin-top: 10%;">
    <div>
    <h2 class="">YF</h2>
    </div>
    <div>
      <h3>Login Form</h3>
    </div>
    <P>Log in. To see it in action.</P>
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
      <el-form-item prop="username" class="el-form--inline">
        <el-input
            placeholder="username"
            v-model="loginForm.username"
            clearable>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" class="el-form--inline">
        <el-input
            placeholder="password"
            v-model="loginForm.password"
            show-password>
        </el-input>
      </el-form-item>
      <el-form-item prop="buttons" class="el-form--inline">
        <el-button type="primary"  @click="submitForm('loginForm')">Login</el-button>
        <el-button type="primary"  @click="resetForm('loginForm')">Reset</el-button>
        <P>
          <small>Do not have an account?</small>
        </P>
        <el-button type="primary" @click="gotoRegistry()">Create an account</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: "Login",
  data() {
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password cannot be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      //表单校验规则
      loginRules: {
        username: [
          {required: true, trigger: 'blur', message: 'Please enter user name'},
        ],
        password: [
          {required: true, trigger: 'blur', message:'Please enter password'},
        ],
      }

    }
  },
  methods: {
    ...mapMutations(['setToken', 'setUserName']),
    submitForm(formName) {
      //_this表当前vue对象
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8081/user/login', _this.loginForm).then(function (resp) {
            if (resp.data === false) {
              alert("Wrong Password or Username")
            } else {
              _this.setToken({token: resp.data});
              _this.setUserName({userName: _this.loginForm.username})
              _this.$router.push('/admin/home');
            }
          })
        } else {
          alert('Failed!')
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    gotoRegistry(){
      const vm = this;
      vm.$router.push('/admin/register');
    }
  }
}
</script>

<style scoped>

</style>