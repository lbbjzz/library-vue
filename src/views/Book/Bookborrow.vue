<template>
    <div class="manage">
        <el-input
                placeholder="请输入书名"
                prefix-icon="el-icon-search"
                v-model="searchContent"
                style="width: 20%">
        </el-input>
        <el-button style="margin-left: 10px" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-table
                v-loading="loading"
                :data="tableData"
                height="120%"
                style="width: 100%" stripe>
            <el-table-column
                    prop="id"
                    label="序号"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="cover"
                    label="封面"
                    width="150">
                <template slot-scope="scope">
                    <img :src="scope.row.cover" alt="" style="width: 80px;height:100px">
                </template>
            </el-table-column>
            <el-table-column
                    prop="bookName"
                    label="书名"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="作者"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="pubHouse"
                    label="出版社"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="pubDate"
                    label="出版日期"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="classes"
                    label="类别"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="quantity"
                    label="馆藏数量"
                    width="130">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button size="mini" style="background-color:lightskyblue;" @click="borrowBook(scope.row)">借阅</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                style="padding-top: 20px"
                class="pager"
                background layout="prev, pager, next"
                page-size="5"
                :total="total"
                @current-change="page">
        </el-pagination>
    </div>
</template>

<script>

export default {
  data () {
    return {
      searchContent: '',
      total: null,
      tableData: [],
      searchFrom: {
        keyword: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: ''
        }
      ]
    }
  },
  methods: {
    borrowBook (row) {
      const _this = this
      _this.$confirm('确认借阅吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get('/api/book/borrow/' + row.id).then(function (resp) {
          console.log(resp.data)
          _this.$message({
            type: 'success',
            message: '借阅成功'
          })
          clearTimeout(_this.timer)
          _this.timer = setTimeout(() => {
            window.location.reload()
          }, 1000)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消借阅'
        })
      })
    },
    search () {
      const _this = this
      if (_this.searchContent === '') {
        _this.$message.warning('请输入查询内容')
      } else {
        this.$http.get('/api/book/findByName/' + _this.searchContent + '/1/5').then(function (resp) {
          // console.log(resp.data)
          // const arr = []
          // for (const i in resp) {
          //   arr.push(resp[i])
          // }
          _this.tableData = resp.data.data
          console.log(_this.tableData, 'Data')
          // _this.total = resp.totalCount
        })
      }
    },
    page (currentPage) {
      // alert(currentPage)
      const _this = this
      this.$http.get('/api/book/findAll/' + currentPage + '/5').then(function (resp) {
        console.log(resp)
        _this.tableData = resp.data.data
        _this.total = resp.data.totalCount
      })
    }
  },
  created () {
    const _this = this
    this.$http.get('/api/book/findAll/1/5').then(function (resp) {
      console.log(resp)
      _this.tableData = resp.data.data
      _this.total = resp.data.totalCount
    })
  }
}
</script>

<style lang="scss" scoped>
    .manage {
        height: 70%;

        &-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
    }

    .pager {
        position: absolute;
        right: 20px;
    }
</style>
