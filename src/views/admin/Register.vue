<template>

  <div style="text-align: center; margin:10% auto">
    <div>
      <h3>Register Form</h3>
    </div>
    <el-form :model="registerForm" :rules="registerRules" ref="registerForm">
      <el-form-item prop="username" class="el-form--inline">
        <el-input
            v-model="registerForm.username"
            placeholder="Please enter username"
            clearable>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" class="el-form--inline">
        <el-input
            placeholder="Please enter password"
            v-model="registerForm.password"
            show-password>
        </el-input>
      </el-form-item>
      <el-form-item prop="buttons" class="el-form--inline">
        <el-button type="primary" @click="submitForm('registerForm')">Submit</el-button>
        <el-button type="primary" @click="resetForm('registerForm')">Reset</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    // const validatePassword = (rule, value, callback) =>{
    //   if(value.length < 6){
    //     callback(new Error('The password cannot be less than 6 digits'))
    //   }else{
    //     callback()
    //   }
    // }
    //注册时输入用户名后检查是否已被占用
    const validateUsername= (rule, value, callback)=> {
      const _this = this;
      this.$axios({
        method: 'post',
        url: 'http://localhost:8081/user/registerCheck',
        data:{
          username: value
        }
      }).then(function (resp){
        // console.log(resp)
        if (resp.data === true) {
          callback()
        } else {
          callback(new Error( 'Username is not available!'))
        }
      })
      // axios.post('http://localhost:8081/user/registerCheck', value).then(function (resp) {
      //
      // })
    }
    return {
      registerForm: {
        username: '',
        password: ''
      },
      //表单校验规则
      registerRules: {
        username: [
          {required: true,trigger: 'blur',
            validator: validateUsername
            // message:'Please enter user name'
          },
        ],
        password: [
          {required: true, trigger: 'blur', message: 'Please enter password'},
          {min: 6, message: 'Length should be more than 6', trigger: 'blur'}
        ],
      }

    }
  },
  methods: {
    submitForm(formName) {
      //_this表当前vue对象
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8081/user/register', _this.registerForm).then(function (resp) {
            if (resp.data === true) {
              alert('Success!');
              _this.$router.push('/admin/login')
            } else {
              alert('False');
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

  },

}
</script>

<style scoped>

</style>