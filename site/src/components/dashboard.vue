<template>
  <div class="container">
    <img id="logo-main" href="../assets/logo.png"/>
    <h2>Welcome to Kiwi, {{username}}! This is your dashboard.</h2>
    <el-button v-on:click="logout" type="primary">Logout</el-button>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

export default {
  name: 'dashboard',
  data () {
    return {
      username: ''
    }
  },
  mounted: function () {
    if (!this.$session.exists()) {
      this.$router.push('/');
    }
    axios({
       headers: {
         "Authorization": this.$session.authToken
       },
       url: '/api/init',
       method: 'GET',
     })
    .then((response) => {
        this.username = response.data.username;
        console.log(response.data.username);
    })
    .catch((error) => {
     this.$notify({
                title: 'Error',
                message: error.response.statusText,
                type: 'error',
                duration: 2000
            }); 
    });   
  },
  methods: {
   logout: function() {
       this.$session.authToken = '';
       this.$session.destroy();
       this.$router.push('/');
   }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
