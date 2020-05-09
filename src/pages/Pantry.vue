<template>
  <q-page padding>

  </q-page>
</template>

<script>
  export default {
    name: 'PantryPage',
    data () {
      return {
        products: ''
      }
    },
    mounted() {
      this.$axios.get('https://192.168.0.21:8000/api').then(response => { this.product = response.data })
    }
  }
</script>

<style>

</style>
