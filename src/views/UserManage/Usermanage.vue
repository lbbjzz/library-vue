<template>
    <div class="manage">
        <el-button style="float:left" type="primary" @click="dialogFormVisible = true">+ 添加</el-button>
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible" style="text-align: center">
            <el-form :model="form">
                <el-form-item label="姓名:" :label-width="formLabelWidth">
                    <el-input v-model="form.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" :label-width="formLabelWidth">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄:" :label-width="formLabelWidth">
                    <el-input v-model="form.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别:" :label-width="formLabelWidth">
                    <el-select v-model="form.sex" autocomplete="off" style="float: left">
                        <el-option label="先生" value="先生"></el-option>
                        <el-option label="女士" value="女士"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系方式:" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="用户信息修改" :visible.sync="edit" modal-append-to-body="false" style="text-align: center">
            <el-form ref="edit" :model="editForm">
                <el-form-item label="姓名:" prop="userName" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-input v-model="editForm.userName" autocomplete="off" style="width: 60%;float: left">
                        {{editForm.userName}}
                    </el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-input v-model="editForm.email" autocomplete="off" style="width: 60%;float: left">
                        {{editForm.email}}
                    </el-input>
                </el-form-item>
                <el-form-item label="年龄:" prop="age" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-input v-model="editForm.age" autocomplete="off" style="width: 60%;float: left">
                        {{editForm.age}}
                    </el-input>
                </el-form-item>
                <el-form-item label="性别:" prop="sex" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-select v-model="editForm.sex" autocomplete="off" style="width: 60%;float: left">
                        <el-option label="先生" value="先生"></el-option>
                        <el-option label="女士" value="女士"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系方式:" prop="phone" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-input v-model="editForm.phone" autocomplete="off" style="width: 60%;float: left">
                        {{editForm.phone}}
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="edit = false">取 消</el-button>
                <el-button type="primary" @click="edit = false">确 定</el-button>
            </div>
        </el-dialog>
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
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleApply(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteById(scope.row)">删除</el-button>
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
      ],
      edit: false,
      editForm: [],
      formLabelWidth: '120px',
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        userName: '',
        email: '',
        sex: '',
        phone: '',
        age: ''
      }
    }
  },
  methods: {
    handleApply: function (index, row) {
      const _this = this
      _this.editForm = row
      _this.edit = true
    },
    deleteById (row) {
      const _this = this
      _this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get('/book/' + row.id).then(function (resp) {
          _this.$message({
            type: 'success',
            message: '删除成功'
          })
          clearTimeout(_this.timer)
          _this.timer = setTimeout(() => {
            window.location.reload()
          }, 1000)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
