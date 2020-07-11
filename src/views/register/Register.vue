<template>
    <div class="register">
        <!--  顶部国际化组件-->
        <div class="el-register-header">
            <el-select
                    v-model="value"
                    @change="changeLangEvent(value)">
                <el-option
                        v-for="(item, index) in options"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                ></el-option>
            </el-select>
        </div>

        <!--        登陆主体-->
        <el-form ref="registerFormRef" :model="form" class="register-form" :rules="rules">
            <h3 class="title">{{$t('language.title')}}</h3>
            <el-form-item prop="userName">
                <el-input type="text" v-model="form.userName" auto-complete="off" :placeholder="$t('language.userBox')">
                    <i slot="prefix" class="el-icon-user input-icon"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="form.password" auto-complete="off"
                          :placeholder="$t('language.passwordBox')">
                    <i slot="prefix" class="el-icon-lock input-icon"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="sex">
                <el-select v-model="form.sex" placeholder="请选择您的性别" auto-complete="off">
                    <el-option label="先生" value="先生"></el-option>
                    <el-option label="女士" value="女士"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="email">
                <el-input type="email" v-model="form.email" auto-complete="off"
                          :placeholder="$t('language.email')">
                    <i slot="prefix" class="el-icon-message"></i>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="text" v-model="form.code" auto-complete="off"
                          :placeholder="$t('language.code')" style="width: 60%">
                    <i slot="prefix" class="el-icon-check"></i>
                </el-input>
                <el-button style=" float:right;width: 35%;font-size: 13px" type="primary" @click="getCode">
                    {{$t('language.getCode')}}
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 100%" type="primary" @click="toRegister">
                    {{$t('language.register')}}
                </el-button>
            </el-form-item>
        </el-form>

        <!--  底部  -->
        <div class="el-register-footer">
            <span>Copyright © JavaEE Group All Rights Reserved.</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {

      // 国际化
      value: 'zh-CN',
      lang: 'zh-CN',
      options: [
        {
          value: 'zh-CN',
          label: '中文'
        },
        {
          value: 'en-US',
          label: 'English'
        },
        {
          value: 'zh-HK',
          label: '繁體'
        }
      ],

      form: {
        email: '',
        userName: '',
        sex: '',
        password: '',
        code: ''
      },

      rules: {
        email: [
          {
            required: true,
            message: this.$t('language.emailBox_error'),
            trigger: 'blur'
          }
        ],
        userName: [
          {
            required: true,
            message: this.$t('language.userBox_error'),
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: this.$t('language.userBox_error'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('language.passwordBox_error'),
            trigger: 'blur'
          },
          {
            min: 6,
            max: 18,
            message: '长度在6-18个字符',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: this.$t('language.code_error'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onSuccess () {
      this.msg = this.$t('language.code_info_1')
    },
    onFail () {
      this.msg = this.$t('language.code_info_2')
    },
    onRefresh () {
      this.msg = ''
    },
    // 切换语言
    changeLangEvent (value) {
      switch (value) {
        case 'zh-CN':
          this.lang = value
          this.$i18n.locale = this.lang // 关键语句
          break
        case 'en-US':
          this.lang = value
          this.$i18n.locale = this.lang // 关键语句
          break
        case 'zh-HK':
          this.lang = value
          this.$i18n.locale = this.lang // 关键语句
          break
        default:
          break
      }
    },
    getCode () {
      console.log(this.form, 'getcode')
      this.$http.post('/api/sendCodeEmail', {
        userName: this.form.userName,
        password: this.form.password,
        sex: this.form.sex,
        email: this.form.email
      }).then(res => {
        console.log(res.data, 'code')
        this.$store.commit('setCode', res.data)
      })
    },
    toRegister () {
      const _code = this.$store.state.tab.code
      console.log(this.$store.state.tab.code, 'getCodeooooo')
      if (_code === this.form.code) {
        this.$http.put('/api/user/register', {
          userName: this.form.userName,
          password: this.form.password,
          sex: this.form.sex,
          email: this.form.email
        }).then(res => {
          console.log(res, 'toregister')
          if (res.data === 'exits') {
            this.$message({
              type: 'warning',
              message: this.$t('language.exits_error')
            })
          } else if (res.data === 'success') {
            this.$message({
              type: 'success',
              message: this.$t('language.register_success')
            })
            this.$router.push('/login')
          } else {
            console.log(res)
            this.$message({
              type: 'warning',
              message: this.$t('language.register_error')
            })
          }
        })
      } else {
        this.$message({
          type: 'success',
          message: this.$t('language.getCode_error')
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .register {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-size: cover;
        background-image: url("../../assets/login_background.jpg");
    }

    .title {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #707070;
    }

    .register-form {
        border-radius: 6px;
        background: #ffffff;
        width: 300px;
        padding: 25px 25px 5px 25px;
        box-shadow: 0 0 35px darkblue;

        .el-input {
            height: 38px;

            input {
                height: 38px;
            }
        }

        .input-icon {
            height: 39px;
            width: 14px;
            margin-left: 2px;
        }

        .el-button {
        }
    }

    .el-register-header {
        position: fixed;
        top: 0;
        width: 100%;
        text-align: right;

        .el-select {
            width: 100px;
        }
    }

    .el-register-footer {
        height: 40px;
        line-height: 40px;
        position: fixed;
        bottom: 0;
        width: 100%;
        text-align: center;
        color: #fff;
        font-family: Arial;
        font-size: 12px;
        letter-spacing: 1px;
    }

    .verify-info {
        text-align: center;
        font-family: Arial;
        color: black;
        font-size: 13px;
    }
</style>
