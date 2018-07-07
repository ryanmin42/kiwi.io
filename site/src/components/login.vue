<template>
  <div class="container">
    <img id="logo-main" href="../assets/logo.png"/>
    <h2>Login here!</h2>
    <el-input placeholder="Username" v-model="username"></el-input> 
    <el-input type="password" size="medium" placeholder="Password" v-model="password"></el-input> 
    <el-button v-on:click="authenticate" type="primary">Login</el-button>
    <router-link tag="li" to="/register">
      <a>Register</a>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
   authenticate: function() {
     axios({
       url: '/api/login',
       method: 'POST',
       auth: {
        username: this.username,
        password: this.password,
       },
     })
    .then((response) => {
     this.$notify({
                title: 'Success',
                message: "You have successfully logged in",
                type: 'success',
                duration: 2000
            }); 
    })
    .catch((error) => {
     this.$notify({
                title: 'Error',
                message: error.response.statusText,
                type: 'error',
                duration: 2000
            }); 
    });
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
