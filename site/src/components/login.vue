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
import Vue from 'vue';

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  beforeCreate: function () {
    if (this.$session.exists()) {
      this.$router.push('/dashboard');
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
      if(response.data.token) {
        this.$session.authToken = 'Bearer ' + response.data.token;
        this.$session.start();
        this.$session.set('jwt', response.data.token);
        this.$router.push('/dashboard');
      } else {
        this.$notify({
                title: 'Error',
                message: 'Authorization Error. Try again',
                type: 'error',
                duration: 2000
            }); 
      }
    })
    .catch((error) => {
      console.log(error);
     this.$notify({
                title: 'Error',
                message: 'rip',
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
