<template>
  <el-row class="tac">
    <el-col :span="12" class="elc">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu :index="`${index + 1}`" v-for="(item, index) in asideData" :key="index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <!-- 二次渲染 -->
          <el-menu-item v-for="(aItem, aIndex) in item.children" :key="aIndex" :index="`${index + 1}-${aIndex + 1}`">
              <router-link :to="aItem.src">{{aItem.name}}</router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
    data() {
        return {
            asideData: [
                {
                    icon: 'el-icon-goods',
                    name: '购物商城',
                    children: [
                        {name: '商品管理', src: '/admin/goods-list'},
                        {name: '栏目管理', src: '/admin/category-list'}
                    ]
                },
                {
                    icon: 'el-icon-service',
                    name: '会员管理',
                    children: [
                        {name: '会员列表', src: '/admin/account-list'}
                    ]
                }
            ]
        }
    },
    //接受父组件传值
    props: {
        isCollapse: {
            //属性类型
            type: Boolean,
            // 默认值
            value: false
        }
    },
    methods: {
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
        console.log(key, keyPath);
        }
    }
};
</script>

<style>
    .el-menu:not(.el-menu--collapse) {
        width: 200px;
    }
    .el-menu{
        border-right: none;
    }
    .el-menu-vertical-demo{

        height:100%;
    }
    .tac, .elc {
        width: 100%;
        height: 100%;
    }
    .el-menu a {
        text-decoration: none;
        color: inherit;
    }
</style>
