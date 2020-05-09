<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{userData.name}}</strong> Profile
      </h3>
    </header>
    <div>{{ userData }}</div>
    <p v-if="currentUser">
      <strong>Token:</strong>
      {{currentUser.token.substring(0, 20)}} ... {{currentUser.token.substr(currentUser.token.length - 20)}}
    </p>
    <p>
      <strong>Email:</strong>
      {{userData.email}}
    </p>
  </div>
</template>

<script>
    import UserService from "src/services/user.service";

    export default {
      name: "Profile",
      data() {
        return {
          userData: ''
        }
      },
      computed: {
        currentUser() {
          return this.$store.state.auth.user;
        }
      },
      mounted() {
        if (!this.currentUser) {
          this.$router.push('/login');
        }
        UserService.getUserInfo().then(
          response => {this.userData = response},
          error => {this.userData =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();}
        )
      }
    }
</script>

<style scoped>

</style>
