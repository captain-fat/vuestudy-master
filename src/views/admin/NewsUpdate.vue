<template>
  <div>
    <el-form :model="newsForm" :rules="newsRules" ref="newsForm">
      <el-form-item label="Title" prop="title">
        <el-input
            v-model="newsForm.title"
            placeholder="Please enter new title"
            clearable></el-input>
      </el-form-item>
      <el-form-item label="Tag" prop="tags">
        <el-input v-model="newsForm.tags"
                  placeholder="Please enter new tag"
                  clearable></el-input>
      </el-form-item>
      <el-form-item label="Content" prop="content">
        <el-input type="textarea" v-model="newsForm.content"
                  placeholder="Please enter new content"
                  clearable>>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveNews('newsForm')">Submit</el-button>
        <el-button type="primary" @click="resetForm('newsForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "NewsUpdate",
  data() {
    return {
      newsForm: {
        title: '',
        tags: '',
        content: ''
      },
      newsRules: {
        title: [{
          required: true, trigger: 'blur', message: 'Please enter news title',
        }],
        tags: [{
          required: true, message: 'Please enter news tag', trigger: 'blur'
        }],
        content: [{
          required: true, message: 'Please enter news content', trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    saveNews(formName) {
      const vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put('http://localhost:8081/news/update', this.newsForm).then(function (resp) {
            vm.$alert(vm.newsForm.title, 'Saved!', {
              confirmButtonClass: 'OK',
              callback: action => {

              }
            });
            vm.$router.push({
              path: '/admin/news',
              params: {
                pageNum: vm.$route.query.pageNum
              }
            });

          })
        } else {
          return false;
        }
      })
    }
  },
  created() {
    const vm = this;
    axios.get('http://localhost:8081/news/findByid/' + this.$route.query.id).then(function (resp) {
      vm.newsForm = resp.data;
    });
  }
}
</script>

<style scoped>

</style>