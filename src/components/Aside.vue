<template>
    <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="height: 100vh;">
        <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path">
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu index="index" v-for="(item, index) in hasChildren" :key="index">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.label }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex">
                    {{subItem.label}}
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
          path: '/video',
          name: 'video',
          label: '图书管理',
          icon: 'reading'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user'
        },
        {
          label: '其他',
          icon: 'user',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
    .el-menu {
        border: none;
    }
</style>
