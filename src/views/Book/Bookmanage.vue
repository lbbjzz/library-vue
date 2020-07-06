<template>
    <div class="manage">
        <el-input
                placeholder="可以输入书名或作者"
                prefix-icon="el-icon-search"
                v-model="searchContent"
                style="width: 20%">
        </el-input>
        <el-button style="margin-left: 10px" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
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
                <template slot-scope="scope">
                    <el-button size="mini">编辑</el-button>
                    <el-button @click="deletebook(scope.row)" size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                style="padding-top: 20px"
                class="pager"
                background layout="prev, pager, next"
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
    search () {
      const _this = this
      this.$http.get('/book/findById/' + _this.searchContent).then(function (resp) {
        console.log(resp.data)
        const arr = []
        for (const i in resp) {
          arr.push(resp[i])
        }
        _this.tableData = arr
        console.log(_this.tableData, 'Data')
        // _this.total = resp.totalCount
      })
    },
    // deletebook (row) {
    //   this.$http.delete('/bbok/deleteById/' + row.id).then(function (resp) {
    //
    //   })
    // },
    page (currentPage) {
      // alert(currentPage)
      const _this = this
      this.$http.get('/book/findAll/' + currentPage + '/5').then(function (resp) {
        console.log(resp.data.data)
        _this.tableData = resp.data.data
        _this.total = resp.data.totalCount
      })
    }
  },
  created () {
    const _this = this
    this.$http.get('/book/findAll/1/5').then(function (resp) {
      console.log(resp.data.data)
      _this.tableData = resp.data.data
      console.log(_this.tableData, 'Data1')
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
