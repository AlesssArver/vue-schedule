import ScheduleService from "@/services/ScheduleService.js";
import axios from "axios";

export const namespeced = true;

export default {
  state: {
    users: []
  },
  mutations: {
    REGISTER(state, user) {
      state.users.push(user);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
    }
  },
  actions: {
    register({ commit }, credentials) {
      return axios
        .post("//localhost:3000/register", credentials)
        .then(({ data }) => {
          commit("REGISTER", data);
        });
    },
    login({ commit }, user) {
      return ScheduleService.Login(user).then(({ data }) => {
        commit("SET_USER", data);
      });
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    }
  }
};
