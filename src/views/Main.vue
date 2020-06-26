<template>
    <el-container style="height: 100%">
        <el-aside width="auto">
            <Aside></Aside>
        </el-aside>
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Header from '../components/Header'
import Aside from '../components/Aside'

export default {
  components: {
    Header,
    Aside
  }
}
</script>

<style lang="scss" scoped>
    .el-header {
        background-color: #B0C4DE;
    }

    .el-main {
    }
</style>
