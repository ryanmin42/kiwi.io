<template>
  <div class="container">
    <img id="logo-main" href="../assets/logo.png"/>
    <h2>Welcome to Kiwi!</h2>
    <router-link tag="li" to="/login">
      <a>Login</a>
    </router-link>
    <router-link tag="li" to="/register">
      <a>Register</a>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {

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
