<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.name}}</strong> Profile
      </h3>
    </header>
    <div>{{ data }}</div>
    <p>
      <strong>Token:</strong>
      {{currentUser.token.substring(0, 20)}} ... {{currentUser.token.substr(currentUser.token.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
  </div>
</template>

<script>
    import UserService from "src/services/user.service";

    export default {
      name: "Profile",
      data() {
        return {
          data: ''
        }
      },
      computed: {
        currentUser() {
          return this.$store.state.auth.user;
        }
      },
      mounted() {
        if (!this.currentUser) {
          this.$router.push('');
        }
        UserService.getUserBoard().then(
          response => {this.data = response},
          error => {this.data =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();}
        )
      }
    }
</script>

<style scoped>

</style>
