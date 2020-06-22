<template>
    <div class="login">

        <!--        <Header></Header>-->
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
        <el-form ref="form" :model="form" class="login-form" :rules="rules">
            <h3 class="title" @click="handleClick">{{$t('language.title')}}</h3>
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
            <el-form-item v-model="activeName" @click="handleClick">
                <el-button style="width: 100%" type="primary" @click="onSubmit('form')">
                    {{$t('language.login')}}
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
    export default {
        name: "Login",
        data() {
            return {
                value: "zh-CN",
                lang: "zh-CN",
                activeName: "first",
                options: [
                    {
                        value: "zh-CN",
                        label: "中文"
                    },
                    {
                        value: "en-US",
                        label: "English"
                    },
                    {
                        value: "zh-HK",
                        label: "繁體"
                    }
                ],
                form: {
                    username: '',
                    password: ''
                },

                rules: {
                    username: [
                        {required: true, message: this.$t('language.userBox_error'), trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: this.$t('language.passwordBox_error'), trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            handleClick() {
            },
            // 切换语言
            changeLangEvent(value) {
                switch (value) {
                    case "zh-CN":
                        this.lang = value;
                        this.$i18n.locale = this.lang; //关键语句
                        break;
                    case "en-US":
                        this.lang = value;
                        this.$i18n.locale = this.lang; //关键语句
                        break;
                    case "zh-HK":
                        this.lang = value;
                        this.$i18n.locale = this.lang; //关键语句
                        break;
                    default:
                        break;
                }
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$router.push("/main");
                    } else {
                        this.$message({
                            message: this.$t('language.login_error'),
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
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
        background-image: url("../assets/login_background.jpg");
    }

    .title {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #707070;
    }

    .login-form {
        border-radius: 6px;
        background: #ffffff;
        width: 250px;
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
        .el-select{
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
</style>
