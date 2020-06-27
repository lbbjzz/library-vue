<template>
  <el-menu
    :collapse="isCollapse"
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="height: 100vh;">
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu :index="item.label" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex"
                      @click="clickMenu(subItem)">
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>

</template>

<script>
export default {
  computed: {
    noChildren () {
      return this.asideMenu.filter(item => !item.children)
    },
    hasChildren () {
      return this.asideMenu.filter(item => item.children)
    },
    isCollapse () {
      return this.$store.state.tab.isCollapse
    }
  },
  data () {
    return {
      asideMenu: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user'
        },
        {
          path: '/userinfo',
          name: 'userinfo',
          label: '个人中心',
          icon: 'user'
        },
        {
          label: '图书',
          icon: 'reading',
          children: [
            {
              path: '/bookborrow',
              name: 'bookborrow',
              label: '图书借阅',
              icon: 'reading'
            },
            {
              path: '/bookmanage',
              name: 'bookmanage',
              label: '图书管理',
              icon: 'reading'
            }
          ]
        }
      ]
    }
  },
  methods: {
    clickMenu (item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-menu {
    border: none;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
