import Vue from "vue";
import Vuex from "vuex";
import schedules from "./modules/schedules.js";
import users from "./modules/users.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    schedules,
    users
  }
});
