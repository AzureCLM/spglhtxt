<template>
    <div class="page-container">
        <el-container>
            <el-aside width="auto">
                <Aside :isCollapse="collapse"></Aside>
            </el-aside>
            <el-container>
                <el-header>
                    <Header @dv="odd"></Header>
                </el-header>
                <el-main>
                    <el-breadcrumb class="cai" separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item v-for="(item, index) in routerInfo" :key="index">{{item}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
    
    
</template>

<script>
import Aside from '../components/Aside.vue';
import Header from '../components/Header.vue';
export default {
    data(){
        return {
            collapse: false
        };
    },
    components: {
        Aside,
        Header
    },
    methods: {
        odd: function(){
            this.collapse = !this.collapse;
        }
    },
    computed: {
        routerInfo: function(){
            // console.log(this.$route)
            const arr = this.$route.matched.map(val => {
                return val.meta;
            })
            // console.log(arr)
            return arr;
        }
    }
}
</script>

<style>
    .cai {
        margin-bottom: 20px;
        padding: 10px 0 15px;
        border-bottom: 1px #ccc solid;
    }
    .el-header {
        /* background-color: #B3C0D1; */
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    
    .el-aside {
        background-color: #D3DCE6;
        position: relative;
    }
    
    .el-main {
        background-color: #E9EEF3;
        color: #333;
    }
    
    .page-container > .el-container {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
