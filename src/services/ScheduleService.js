import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});   

export default {
  Register(user) {
    return apiClient.post("/users", user);
  },
  Login(user) {
    return apiClient.post("/users", user);
  },
  getSchedules(perPage, page) {
    return apiClient.get("/schedules?_limit=" + perPage + "&_page=" + page);
  },
  getSchedule(id) {
    return apiClient.get("/schedules/" + id);
  },
  editSchedule(id) {
    return apiClient.get("/schedules/" + id);
  },
  postSchedule(schedule) {
    return apiClient.post("/schedules", schedule);
  },
  deleteSchedule(id) {
    return apiClient.delete("/schedules/" + id);
  }
};
