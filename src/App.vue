<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
  //第一种
  //  this.$axios({
  //    url: 'https://api.github.com/users',
  //    method: 'get',
  //    params: {}
  //  }).then(res => {
  //    console.log(res);
  //  })

  //第二种
  // this.$axios.get('https://api.github.com/users').then(res => {
  //   console.log(res);
  // })
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
</style>
