<template>
  <q-page>
    <Index v-if="currentUser" />
    <Login v-else/>
  </q-page>
</template>

<script>
  import Login from "pages/Login";
  import Index from "components/Index";

  export default {
    name: 'home',
    components: {
      Login,
      Index
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
  }
</script>

<style scoped>

</style>
