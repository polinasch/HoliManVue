<template>
  <div id="app">
    <!--<Login/>-->
    <router-link
      v-if="authenticated"
      to="/login"
      v-on:click.native="logout()"
      replace
    >
      <b-button variant="outline-primary" class="mb-2">
        <b-icon icon="power" aria-hidden="true"></b-icon> Logout
      </b-button>
    </router-link>
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      authenticated: false,
      mockAccount: {
        username: "admin",
        password: "test",
      },
    };
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
    },
  },
};
</script>