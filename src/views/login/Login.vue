<template>
    <div class="login">
        <!--  顶部国际化组件-->
        <div class="el-login-header">
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
        <el-form ref="loginFormRef" :model="form" class="login-form" :rules="rules">
            <h3 class="title">{{$t('language.title')}}</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="form.username" auto-complete="off" :placeholder="$t('language.userBox')">
                    <i slot="prefix" class="el-icon-user input-icon"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="form.password" auto-complete="off"
                          :placeholder="$t('language.passwordBox')">
                    <i slot="prefix" class="el-icon-lock input-icon"></i>
                </el-input>
            </el-form-item>
            <!--            验证码-->
            <el-form-item>
                <div class="login-code">
                    <slide-verify
                            :l="43"
                            :r="10"
                            :w="305"
                            :h="190"
                            :imgs="bgimgs"
                            @success="onSuccess"
                            @fail="onFail"
                            @refresh="onRefresh"
                            :slider-text="text"
                    ></slide-verify>
                    <div class="verify-info">{{msg}}</div>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 100%" type="primary" @click="onLogin">
                    {{$t('language.login')}}
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 100%" type="primary" @click="toRegister">
                    {{$t('language.register')}}
                </el-button>
            </el-form-item>
        </el-form>

        <!--  底部  -->
        <div class="el-login-footer">
            <span>Copyright © JavaEE Group All Rights Reserved.</span>
        </div>
    </div>
</template>

<script>
import a from '../../assets/verify/1.jpg'
import b from '../../assets/verify/2.jpg'
import c from '../../assets/verify/3.jpg'
import d from '../../assets/verify/4.jpg'
import e from '../../assets/verify/5.jpg'
import f from '../../assets/verify/6.jpg'
import g from '../../assets/verify/7.jpg'
import h from '../../assets/verify/8.jpg'

export default {
  data () {
    return {
      // 验证码
      msg: '',
      bgimgs: [a, b, c, d, e, f, g, h],
      text: '',

      // 国际化
      value: 'zh-CN',
      lang: 'zh-CN',
      // activeName: 'first',
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
        username: '',
        password: ''
      },

      rules: {
        username: [
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
            min: 3,
            max: 16,
            message: '长度在3-16个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    toRegister () {
      this.$router.push('/register')
    },
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
    onLogin () {
      this.$refs.loginFormRef.validate(async value => {
        if (!value) return
        const res = await this.$http.post('/api/userLogin', this.form)
        if (res.data.code !== 200) {
          console.log(res)
          this.$message({
            message: this.$t('language.login_error'),
            type: 'warning'
          })
        } else {
          console.log(res)
          this.$message({
            message: this.$t('language.login_success'),
            type: 'success'
          })
          console.log(res)
          window.sessionStorage.setItem('username', res.data.data.username)
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu', res.data.data.menu)
          // console.log(res.data.data.menu)
          this.$store.commit('addMenu', this.$router)
          this.$router.push({ name: 'home' })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .login {
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

    .login-form {
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

    .el-login-header {
        position: fixed;
        top: 0;
        width: 100%;
        text-align: right;

        .el-select {
            width: 100px;
        }
    }

    .el-login-footer {
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
