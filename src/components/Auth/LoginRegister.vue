<template>
	<form @submit.prevent="submitForm">
		<div class="row q-mb-md">
			<q-banner class="bg-grey-3 col">
			  <template v-slot:avatar>
			    <q-icon name="account_circle" color="primary" />
			  </template>
			  {{ tab | titleCase }} to access your food anywhere!
			</q-banner>
		</div>
		<div class="row q-mb-md">
			<q-input
				v-model="user.email"
				:rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email address.']"
				ref="email"
        type="email"
				lazy-rules
				outlined
				class="col"
				label="Email"
				stack-label />
		</div>
    <div class="row q-mb-md" v-if="this.tab === 'register'">
      <q-input
        v-model="user.name"
        :rules="[ val => val.length >= 1 || 'Please write something ... :(']"
        ref="name"
        lazy-rules
        outlined
        class="col"
        label="Name"
        stack-label />
    </div>
		<div class="row q-mb-md">
			<q-input
				v-model="user.password"
				:rules="[ val => val.length >= 6 || 'Please enter at least 6 characters.']"
				ref="password"
				lazy-rules
				type="password"
				outlined
				class="col"
				label="Password"
				stack-label />
		</div>
		<div class="row">
			<q-space />
			<q-btn
				color="primary"
				:label="tab"
				type="submit" />
		</div>
	</form>
</template>

<script>
  import User from "src/models/user";

	export default {
		props: ['tab'],
		data() {
			return {
			  user: new User(),
        isLoading: false,
        submitted: false,
        successful: false,
        message: '',
			}
		},
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn
      }
    },
    created() {
		  if (this.loggedIn) {
		    this.$router.push('/profile')
      }
    },
    methods: {
			isValidEmailAddress(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase())
			},
			submitForm() {
			  this.isLoading = true
				this.$refs.email.validate()
				this.$refs.password.validate()
				if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
					if (this.tab === 'register') {
            this.submitted = true
            this.$store.dispatch('auth/register', this.user).then(
              data => {
                this.message = data.message
                this.successful = true
              },
              error => {
                this.message = (error.response && error.response.data) || error.message || error.toString()
                this.successful = false
              }
            )
					}
					else {
					  this.$store.dispatch('auth/login', this.user).then( () => {
                this.$router.push('profile')
            },
            error => {
					    this.isLoading = false
              this.message = (error.response && error.response.data) || error.message || error.toString()
            })
          }
				}
			}
		},
		filters: {
			titleCase(value) {
				return value.charAt(0).toUpperCase() + value.slice(1)
			}
		}
	}
</script>
