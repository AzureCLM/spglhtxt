<template>
  <el-row type="flex" justify="center" class="container">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="form">
      <div class="title">登录</div>
      <el-form-item label="账号" prop="uname">
          <el-input v-model="form.uname"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="upwd" >
          <el-input v-model="form.upwd" type="password"></el-input>
      </el-form-item>
      
      <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          uname: '',
          upwd: ''
        },
        rules: {
          uname: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
          upwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        // console.log(111);
        this.$refs.form.validate((valid) => {
          if(!valid) return;
            this.$axios({
              url: '/admin/account/login',
              method: 'post',
              data: this.form,
              //处理跨域请求的参数
              // withCredentials: true
            }).then(res => {
              // console.log(res);
              const {status, message} = res.data;
              // console.log(status)
              // console.log(message)
              //判断是否登录成功
              if(status == 0){
                localStorage.setItem('username', message.uname)
                localStorage.setItem('realname', message.realname)
                this.$router.push('/admin');
              }else{
                this.$message({
                  message: message,
                  type: 'success'
              });
            }
          })
        })
        
      }
    }
  }
</script>
<style lang="less">
  .container {
    margin-top: 200px;
    > .form {
      width: 350px;
      > .title {
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
      }
    }
  }
</style>
