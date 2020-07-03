<template>
    <div class="manage">
        <el-table
                :data="tableData"
                height="120%"
                style="width: 100%" stripe>
            <el-table-column
                    prop="id"
                    label="序号"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="用户名"
                    width="180">
            </el-table-column>
<!--            <el-table-column-->
<!--                    prop="password"-->
<!--                    label="密码"-->
<!--                    width="150">-->
<!--            </el-table-column>-->
            <el-table-column
                    prop="email"
                    label="邮箱"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="联系方式"
                    width="180">
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
  created () {
    const _this = this
    this.$http.get('/user/list').then(function (resp) {
      console.log(resp)
      _this.tableData = resp.data
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
