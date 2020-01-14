import ScheduleService from "@/services/ScheduleService.js";

export const namespeced = true;

export default {
  state: {
    schedules: [],
    schedulesTotal: 0
  },
  mutations: {
    ADD_SCHEDULE(state, schedule) {
      state.schedules.push(schedule);
    },
    DELETE_SCHEDULE(state, schedule) {
      state.schedules.push(schedule);
    },
    SET_SCHEDULES(state, schedules) {
      state.schedules = schedules;
    },
    EDIT_SCHEDULE(_state, { schedule, key, value }) {
      //Vue.set(schedule, key, value);
      schedule[key] = value;
    },
    SET_SCHEDULES_TOTAL(state, schedulesTotal) {
      state.schedulesTotal = schedulesTotal;
    }
  },
  actions: {
    createSchedule({ commit }, schedule) {
      return ScheduleService.postSchedule(schedule).then(() => {
        commit("ADD_SCHEDULE", schedule);
      });
    },
    editSchedule({ commit }, schedule) {
      return ScheduleService.editSchedule(schedule).then(() => {
        commit("EDIT_SCHEDULE", schedule);
      });
    },
    deleteSchedule({ commit }, schedule) {
      return ScheduleService.deleteSchedule(schedule).then(() => {
        commit("DELETE_SCHEDULE", schedule);
      });
    },
    fetchSchedules({ commit }, { perPage, page }) {
      ScheduleService.getSchedules(perPage, page)
        .then(response => {
          commit(
            "SET_SCHEDULES_TOTAL",
            parseInt(response.headers["x-total-count"])
          );
          commit("SET_SCHEDULES", response.data);
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    },
    fetchSchedule({ commit, getters }, id) {
      var schedule = getters.getScheduleById(id);

      if (schedule) commit("SET_SCHEDULE", schedule);
      else {
        ScheduleService.getSchedule(id)
          .then(response => {
            commit("SET_SCHEDULE", response.data);
          })
          .catch(error => {
            console.log("There was an error:", error.response);
          });
      }
    }
  },
  getters: {
    getScheduleById(state, id) {
      return state.schedules.find(schedule => schedule.id === id);
    }
  }
};
