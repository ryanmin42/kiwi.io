<template>
  <div class="container">
    <img id="logo-main" href="../assets/logo.png"/>
    <h2>Signup here!</h2>
    <el-input placeholder="Username" v-model="username" @change="checkLength"></el-input> 
    <el-input placeholder="Email Address" v-model="email" @change="checkLength"></el-input>
    <el-input type="password" placeholder="Password" @change="checkLength" v-model="password"></el-input>
    <el-button v-on:click="authenticate" :disabled="inputDisabled" type="primary">Register</el-button>
    <router-link tag="li" to="/login">
      <a>Login</a>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'register',
  data () {
    return {
      username: '',
      password: '',
      email: '',
      inputDisabled: true
    }
  },
  beforeCreate: function () {
    if (this.$session.exists()) {
      this.$router.push('/dashboard');
    }
  },
  methods: {
   authenticate: function() {
     try{
      axios({
       url: '/api/register',
       method: 'POST',
       auth: {
        username: this.username,
        password: this.password,
       },
     })
    .then((response) => {
      this.$notify({
                title: 'Success',
                message: "Your account has been succesfully created",
                type: 'success',
                duration: 2000
            }); 
    })
    .catch((error) => {
      console.log(error);
      this.$notify({
                title: 'Error',
                message: error.response.data.message,
                type: 'error',
                duration: 2000
            }); 
    });
     } catch(e) {
       console.log(e);
     }
   },
   checkLength: function() {
       let valid = this.validateEmail(this.email);
       console.log(valid);
       if(this.password.length >= 8 && this.username.length > 0 && valid)
          this.inputDisabled = false;
       else {
        this.inputDisabled = true; 
        if(this.username.length <= 0) {
            this.$notify({
                title: 'Error',
                message: 'Please provide a username',
                type: 'error',
                duration: 2000
            });
        } 
        else if (!valid) {
            this.$notify({
                title: 'Error',
                message: 'Please enter a valid email address',
                type: 'error',
                duration: 2000
            }); 
        }     
        else if (this.password.length < 8) {
            this.$notify({
                title: 'Error',
                message: 'Password must be at least 8 characters long',
                type: 'error',
                duration: 2000
            });
        }
       }
   },
   validateEmail: function(emailAddress) {
       let re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
       return re.test(emailAddress);
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
