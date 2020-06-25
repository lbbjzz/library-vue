<template>
    <header>
        <div class="l-content">
            <el-button plain icon="el-icon-menu" size="mini"></el-button>
            <!--            面包屑-->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span class="el-dropdown-link"><img :src="userImag" class="user"/></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
export default {
  data () {
    return {
      userImag: require('../assets/images/user.png')
    }
  }
}
</script>

<style lang="scss" scoped>
    header {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-between;
    }

    .l-content {
        display: flex;
        align-items: center;
        .el-button{
            margin-right: 20px;
        }
    }

    .r-content {
        .user {
            width: 50px;
            height: 50px;
        }
    }
</style>
