<template>
  <q-page padding>

  </q-page>
</template>

<script>
  import UserService from '../services/user.service'
  export default {
    name: 'PantryPage',
    data () {
      return {
        data: ''
      }
    },
    mounted() {
      UserService.getPantries().then(
        response => {this.data = response},
        error => {this.data =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();}
      )
    }
  }
</script>

<style>

</style>
