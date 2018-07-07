<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
* {
   font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.el-input {
  width: 20%;
  display: block;
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 10px;
}

.el-button {
  display: block;
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 10px;
}

</style>
