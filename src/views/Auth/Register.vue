<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-6">
      <div class="title">Register</div>
      <!-- <p v-if="success">U a registered!</p> -->
      <form @submit.prevent="register">
        <div class="field">
          <div class="control">
            <input
              type="text"
              class="input"
              placeholder="Name"
              v-model="name"
              required
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input
              type="text"
              class="input"
              placeholder="Surname"
              v-model="surname"
              required
            />
          </div>
        </div>
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
              type="password"
              class="input"
              placeholder="Password"
              v-model="password"
              required
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input
              type="password"
              class="input"
              placeholder="Repeat password"
              required
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button type="submit" class="button">Register</button>
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
      name: "",
      surname: "",
      email: "",
      password: "",
      errors: null
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("users/register", {
          name: this.name,
          surname: this.surname,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch(err => {
          this.errors = err.response.data.errors;
        });
    }
  }
};
</script>

<style scoped></style>
