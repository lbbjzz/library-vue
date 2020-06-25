<template>
    <div class="container" style="height: 100vh">
        <el-container>
            <el-aside width="200px">
                <Aside></Aside>
            </el-aside>
            <el-container>
                <el-header>
                    <Header></Header>
                </el-header>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
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
    .el-header{
        background-color: #33CCFF;
    }
</style>
