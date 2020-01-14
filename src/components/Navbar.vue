<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link :to="{ name: 'home' }" class="navbar-item">
          Home
        </router-link>

        <router-link :to="{ name: 'schedules' }" class="navbar-item">
          Schedules
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link :to="{ name: 'register' }" class="button is-primary">
              <strong>Sign up</strong>
            </router-link>
            <router-link :to="{ name: 'login' }" class="button is-light">
              Log in
            </router-link>
            <!-- <button v-if="loggedIn" class="button is-light" @click="logout">
              Logout
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { authComputed } from "@/store/loggedIn.js";

export default {
  computed: {
    ...authComputed
  }
  // methods: {
  //   logout() {
  //     this.$store.dispatch("logout");
  //   }
  // }
};
</script>
