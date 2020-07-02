<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button>
      <!--            面包屑-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link"><img :src="userImg" class="user"/></span>
        <el-dropdown-menu slot="dropdown">
          <!--                    <el-dropdown-item>个人中心</el-dropdown-item>-->
          <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  },
  data () {
    return {
      userImg: require('../assets/images/user.png')
    }
  },
  methods: {
    collapseMenu () {
      this.$store.commit('collapseMenu')
    },
    logOut () {
      window.sessionStorage.clear()
      this.$router.push('/login')
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

    .el-button {
      margin-right: 20px;
    }
  }

  .r-content {
    .user {
      width: 50px;
      height: 50px;
    }

    .el-dropdown-link {
      margin-right: 5px;
    }
  }
</style>

<style lang="scss">
  .el-breadcrumb__item {
    .el-breadcrumb__inner {
      color: #666666;
      font-weight: normal;
    }

    &:last-child {
      .el-breadcrumb__inner {
        color: black;
      }
    }
  }
</style>
