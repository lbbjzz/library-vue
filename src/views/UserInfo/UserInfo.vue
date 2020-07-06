<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="userName" style="width: 25%">
                <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-select v-model="ruleForm.sex" placeholder="请选择您的性别">
                    <el-option label="先生" value="先生"></el-option>
                    <el-option label="女士" value="女士"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="年龄" prop="age" style="width: 25%">
                <el-input v-model="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone" style="width: 25%">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email" style="width: 25%">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        userName: '',
        sex: '',
        phone: '',
        email: '',
        age: ''
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created () {
    const _this = this
    this.$http.get('/user/getUser').then(function (resp) {
      console.log(resp)
      _this.ruleForm = resp.data
    })
  }
}
</script>

<style scoped>

</style>
