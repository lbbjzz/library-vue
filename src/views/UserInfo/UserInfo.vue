<template>
    <div class="info">
        <div style="float: left;width: 20%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户ID" prop="id">
                    <el-input v-model="ruleForm.id" readonly></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="ruleForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="ruleForm.sex" placeholder="请选择您的性别">
                        <el-option label="先生" value="先生"></el-option>
                        <el-option label="女士" value="女士"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="ruleForm.age"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <!--            <el-form :model="pwdForm" :rules="pwdrules" ref="pwdForm" label-width="100px" class="demo-ruleForm"-->
            <!--                     style="margin-top: 40px">-->
            <!--                <el-form-item label="修改密码" prop="confirmpwd">-->
            <!--                    <el-input v-model="pwdForm.confirmpwd"></el-input>-->
            <!--                </el-form-item>-->
            <!--                <el-form-item>-->
            <!--                    <el-button type="primary" @click="editpwd('pwdForm')">修改</el-button>-->
            <!--                    <el-button @click="resetForm('pwdForm')">重置</el-button>-->
            <!--                </el-form-item>-->
            <!--            </el-form>-->
        </div>
        <div style="float: right;width: 75%;height: 100%">
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
                        prop="borrow_date"
                        label="借阅时间"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="bookId"
                        label="图书ID"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="returnDate"
                        label="最晚归还时间"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="isReturned"
                        label="是否归还"
                        width="150">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" style="background-color:lightskyblue;" @click="returnBook(scope.row)">
                            归还
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      total: null,
      ruleForm: {
        userName: '',
        sex: '',
        phone: '',
        email: '',
        age: ''
      },
      pwdForm: {
        newpwd: '',
        confirmpwd: ''
      },
      pwdrules: {
        newpwd: [
          {
            required: true,
            message: '请输入新密码！',
            trigger: 'blur'
          }
        ],
        confirmpwd: [
          {
            required: true,
            message: '请再次输入密码！',
            trigger: 'blur'
          }
        ]
      },
      rules: {
        userName: [
          {
            required: true,
            message: '请输入用户名！',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 8,
            message: '长度在 2 到 8 个字符',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择您的性别！',
            trigger: 'change'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入您的电话号码！',
            trigger: 'blur'
          },
          {
            min: 8,
            max: 11,
            message: '长度在 8 到 11 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入您的电子邮箱！',
            trigger: 'blur'
          }
        ],
        age: [
          {
            required: true,
            message: '请输入您的年龄！',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 3,
            message: '长度在 2 到 3 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    returnBook (row) {
      const _this = this
      _this.$confirm('确认归还吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.isReturned === 1) {
          _this.$message({
            type: 'warning',
            message: '您已归还，无需重复操作'
          })
        } else {
          this.$http.get('/api/book/return/' + row.bookId).then(function (resp) {
            console.log(resp.data)
            _this.$message({
              type: 'success',
              message: '归还成功'
            })
            clearTimeout(_this.timer)
            _this.timer = setTimeout(() => {
              window.location.reload()
            }, 1000)
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消归还'
        })
      })
    },
    submitForm (formName) {
      const _this = this
      _this.$confirm('确认修改吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.submitForm, 'submit')
        this.$http.put('/api/user/save', this.ruleForm).then(function (resp) {
          console.log(resp)
          _this.$message({
            type: 'success',
            message: '修改成功'
          })
          clearTimeout(_this.timer)
          _this.timer = setTimeout(() => {
            window.location.reload()
          }, 1000)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    // editpwd (formName) {
    //   const _this = this
    //   _this.$confirm('确认修改吗, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$http.put('/api/user/save', this.pwdForm).then(function (resp) {
    //       _this.$message({
    //         type: 'success',
    //         message: '修改成功'
    //       })
    //       clearTimeout(_this.timer)
    //       _this.timer = setTimeout(() => {
    //         window.location.reload()
    //       }, 1000)
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消修改'
    //     })
    //   })
    // },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created () {
    const _this = this
    const __this = this
    this.$http.get('/api/user/getUser').then(function (resp) {
      console.log(resp)
      _this.ruleForm = resp.data
      const userid = resp.data.id
      _this.$http.get('/api/borrow/findByUserId/' + userid + '/1/30').then(function (res) {
        console.log(res.data.data, 'datdatatda')
        __this.tableData = res.data.data
      })
    })
  }
}
</script>

<style lang="scss" scoped>
    .info {
        height: 70%;
    }
</style>
