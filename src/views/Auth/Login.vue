<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-6">
      <div class="title">Login</div>
      <form @submit.prevent="login">
        <div class="field">
          <div class="control">
            <input
              type="email"
              class="input"
              placeholder="Email"
              v-model="email"
              required
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input
              type="text"
              class="input"
              placeholder="Password"
              v-model="password"
              required
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button type="submit" class="button">Login</button>
          </div>
        </div>
        <div class="error">
          <ul>
            <li v-for="(error, index) in errors" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>
      </form>
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: null
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "schedules" });
        })
        .catch(err => {
          this.errors = err.response.data.errors;
        });
    }
  }
};
</script>

<style scoped></style>
