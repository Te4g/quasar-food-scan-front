<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Food-scan
        </q-toolbar-title>

        <div>by Te4g</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="currentUser"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Hello
          <q-btn @click="logout">Logout</q-btn>
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Home',
          caption: 'Go home',
          icon: 'home',
          link: {name: 'home'}
        },
        {
          title: 'Scan',
          caption: 'Scan product',
          icon: 'school',
          link: {name: 'scan'}
        },
        {
          title: 'Pantry',
          caption: 'Your food stocks',
          icon: 'kitchen',
          link: {name: 'pantry'}
        },
        {
          title: 'Profile',
          caption: 'Your profile',
          icon: 'account_circle',
          link: {name: 'profile'}
        }
      ]
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>
