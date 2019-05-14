<template>
    <el-row type="flex" align="middle" justify="space-between">
        <i class="el-icon-back" @click="stretch"></i>
        <div class="userInfo">
            <span>{{username}}</span>
            <span>{{realname}}</span>
            <span @click="pagesleave">退出</span>
        </div>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            realname: ''
        }
    },
    methods: {
        stretch: function(){
            this.$emit('dv');
        },
        pagesleave: function(){
            this.$axios({
                url: '/admin/account/logout',
                method: 'GET'
            }).then(res => {
                // console.log(res);
                const {status} = res.data;
                if(!status) {
                    // this.$router.push('/login');
                    this.$router.replace('/login');
                    //清除localStorage的username和realname
                    localStorage.removeItem("username");
                    localStorage.removeItem("realname");
                }
            })
        }
    },
    mounted() {
        this.username = localStorage.getItem('username')
        this.realname = localStorage.getItem('realname')
    }
}
</script>

<style lang="less">
    .el-icon-back {
        cursor: pointer;
    }
    .userInfo {
        > span {
            margin: 0 5px;
        }
        > span:nth-of-type(3){
            cursor: pointer;
        }
    }
</style>
