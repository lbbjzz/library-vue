<template>
    <div class="manage">
        <div class="manageheader" style="height: 10%;background-color:lightskyblue;">
        </div>
        <el-table
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
                <template>
                    <el-button size="mini">编辑</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
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
    page (currentPage) {
      // alert(currentPage)
      const _this = this
      this.$http.get('/book/findAll/' + currentPage + '/5').then(function (resp) {
        console.log(resp)
        _this.tableData = resp.data.data
        _this.total = resp.data.totalCount
      })
    }
  },
  created () {
    const _this = this
    this.$http.get('/book/findAll/1/5').then(function (resp) {
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
