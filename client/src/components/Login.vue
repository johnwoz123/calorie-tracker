<template>
  <div class="container">
    <div class="login-container">
      <h1>Login</h1>
    </div>
    <br/>
    <div>
      <b-form>
        <b-form-group id="email" label="Email" label-for="emailInput" description="Email used to login">
          <b-form-input id="emailInput" type="email" v-model="email" required placeholder="Enter Email">
          </b-form-input>
        </b-form-group>
        <b-form-group id="password" label="Password" label-for="passwordInput" description="Password to login">
          <b-form-input id="passwordInput" type="password" v-model="password" required placeholder="Enter Password">
          </b-form-input>
        </b-form-group>
      </b-form>
      <!--<input type="email" name="email" placeholder="email"-->
      <!--v-model="email">-->
      <!--<input type="password" name="password" placeholder="password"-->
      <!--v-model="password">-->
      <br/>
      <div class="error" v-html="error"></div>
      <br/>
      <button
        class="btn btn-primary"
        @click="login">login
      </button>
    </div>
  </div>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        email: '',
        password: '',
        error: null
      }
    },
    methods: {
      async login() {
        try {
          const response = await AuthenticationService.login({
            email: this.email,
            password: this.password
          });
          this.$store.dispatch('setToken',response.data.token);
          this.$store.dispatch('setUser',response.data.user);
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
  }
</script>

<style scoped>
  .error {
    color: red;
  }
  .login-container {
    margin-top: 5%;
  }
</style>

