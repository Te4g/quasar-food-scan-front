<template>
  <q-page class="flex flex-center column">
    <div>
      <img
        alt="Quasar logo"
        src="~assets/food-scan.png"
      >
    </div>
    <div>
      <h3>Hello </h3>
    </div>
  </q-page>
</template>

<script>

  export default {
    name: 'home',
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
  }
</script>

<style scoped>

</style>
