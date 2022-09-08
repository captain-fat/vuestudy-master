<template>
  <div>
    <el-table
        :data="tableData">
      <el-table-column
          prop="title"
          label="Title"
          width="150"
          header-align="center"
      >
      </el-table-column>
      <el-table-column
          prop="tags"
          label="Tag"
          width="120"
          header-align="center">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form>
            <el-form-item label="">
              <span>{{ props.row.content }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          :formatter="hideTooLongContent"
          prop="content"
          label="Content"
          header-align="center"
      >
        <!--        <p>Expand to see details</p>-->
      </el-table-column>

      <el-table-column
          prop="pageview_counts"
          label="PageView"
          width="120"
          header-align="center">
      </el-table-column>
      <el-table-column
          prop="operation"
          label="Operation"
          width="120"
          header-align="center">
        <template slot-scope="props">
          <el-button type="text" size="small" @click="edit(props.row)">Edit</el-button>
          <el-button type="text" size="small" @click="deleteItem(props.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flx" justify="center" style="margin-top: 15px">
      <el-col :span="6" style="text-align: left">
        <el-button @click="addNews()">Add</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total"
            @current-change="page(pageNum)"
            :current-page.sync="pageNum"
            ref="pagination">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "News",
  components: {},
  data() {
    return {
      pageSize: 0,
      total: 0,
      tableData: null,
      pageNum: 0
    }
  }
  ,
  methods: {
    //引入vuex
    ...mapMutations(['setPageNum', 'delPageNum']),
    page(currentPage) {
      const _this = this;
      this.currentPage = currentPage;
      axios.get('http://localhost:8081/news/findAll/' + (currentPage - 1) + '/6').then(function (resp) {
        _this.tableData = resp.data.content;
        _this.pageSize = resp.data.size;
        _this.total = resp.data.totalElements;
      })
    },
    //隐藏表格中过长内容
    hideTooLongContent(row, column, cellValue) {
      if (!cellValue) return "";
      if (cellValue.length > 20) {
        return cellValue.slice(0, 20) + '...';
      }
      return cellValue;
    },
    addNews() {
      const vm = this;
      vm.$router.push('/admin/news/update');
    },
    deleteItem(row) {
      const vm = this;
      axios.delete('http://localhost:8081/news/deleteByid/' + row.id).then(function (resp) {
        vm.$alert(row.title, "Deleted!", {
          confirmButtonText: 'OK',
          callback: action => {
            window.location.reload()
          }
        });
      })
    },
    edit(row) {
      const vm = this;
      // console.log(this.currentPage);
      vm.setPageNum({pageNum: this.currentPage})
      this.$router.push({
        path: '/admin/news/update',
        query: {
          id: row.id,
        },
      });
    }
  }
  ,
  created() {
    const _this = this;
    axios.get('http://localhost:8081/news/findAll/0/6').then(function (resp) {
      _this.tableData = resp.data.content;
      _this.pageSize = resp.data.size;
      _this.total = resp.data.totalElements;
    })
  },
  mounted() {
    //完成编辑后返回项目所在页码
    let pageNum = localStorage.getItem('pageNum');//获取本地存储的页码
    if (pageNum === null || pageNum === '' || pageNum === 'undefined') {//为空则显示第一页
      // console.log('pageNum = 0')
      this.pageNum = 0
    } else {
      console.log(pageNum);
      this.pageNum = pageNum-0;
      this.page(pageNum)
      this.delPageNum({pageNum: ''});
    }

  },
}
</script>

<style scoped>

</style>