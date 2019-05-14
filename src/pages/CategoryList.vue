<template>
    <div>
        <el-row class="dd" type="flex" algin="middle" justify="space-between">
            <el-col>
                <el-button @click="goodsadd_tiaozhuan">新增</el-button>
                <el-button @click="handmoredelete">删除</el-button>
            </el-col>           
        </el-row>
        <el-tree
            class="tree-title"
            :data="title">
            <span class="custom-tree-node">
                <span>类别</span>
                <span>排序</span>
                <span>操作</span>
            </span>
        </el-tree>
        <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ data }">
                <span>{{ data.title }}</span>
                <span>
                    <input class="input" size="mini" :value="data.sort_id" @blur="handleBlur($event, data)"/>
                </span>
                <el-button
                    type="text"
                    size="mini">
                    编辑
                </el-button>
            </span>
        </el-tree>
    </div>
</template>

<script>
let id = 1000;

  export default {
    data() {
      return {
        title: [{}],
        data: []
      }
    },

    methods: {
        handleBlur(event, data){
            data = {
                ...data,
                id: data.category_id,
                sort_id: event.target.value
            }
            this.$axios({
                url: `/admin/category/edit/${data.id}`,
                method: 'POST',
                data
            }).then(res => {
                console.log(res);
                const {message} = res.data;
                this.$message({
                    message,
                    type: "success"
                })
            })
        }
    },
    mounted() {
        this.$axios({
            url: '/admin/category/getlist/goods',
        }).then(res => {
            console.log(res);
            const {message} = res.data;
            // this.data = message;
            //递归函数判断是否含有子元素
            let arr = [];
            function loop(arr, item){
                arr.forEach(v => {
                    if(v.category_id == item.parent_id){
                        if(!v.children){
                            v.children = [];
                        }
                        v.children.push(item);
                        return;
                    }
                    if(v.children){
                        loop(v.children, item)
                    }
                })            
            }
            message.forEach(v => {
                if(v.parent_id === 0){
                    arr.push(v);
                }else{
                    loop(arr, v);
                }
            })
            console.log(arr)
            this.data = arr;
        })
    },
  };
</script>

<style lang="less" scoped>
.dd {
  margin: 0 0 20px 0;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.input{
    width:42px;
    height:18px;
    line-height:18px;
}
</style>
