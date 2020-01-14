<template>
  <div class="columns">
    <div class="column">
      <template v-if="page !== 1">
        <router-link
          :to="{ name: 'schedules', query: { page: page - 1 } }"
          rel="prev"
        >
          Last
        </router-link>
      </template>
    </div>
    <div class="column">
      <transition name="fade">
        <ScheduleShow v-if="visible" @close="visible = !visible" />
      </transition>
      {{ new Date().toLocaleString() }}
      <transition-group name="slide-up" tag="div">
        <div
          class="card"
          v-for="schedule in schedules"
          :key="schedule.id"
          :schedule="schedule"
        >
          <div class="card-header">
            <router-link
              :to="{ name: 'schedule-show', params: { id: schedule.id } }"
            >
              <button
                @click="visible = !visible"
                type="button"
                class="btn-edit"
              >
                Edit
              </button>
            </router-link>
            <button class="delete" @click="delete"></button>
          </div>
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="column">
                  <h3>{{ schedule.title }}</h3>
                </div>
                <div class="column">
                  <p>{{ schedule.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
      <ScheduleCreate />
    </div>
    <div class="column">
      <router-link :to="{ name: 'schedules', query: { page: page + 1 } }">
        <a>Next</a>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ScheduleCreate from "../components/ScheduleCreate";

export default {
  components: { ScheduleCreate },
  props: { schedule: Object },
  created() {
    this.perPage = 3;

    this.$store.dispatch("fetchSchedules", {
      perPage: this.perPage,
      page: this.page
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.schedulesTotal > this.page * this.perPage;
    },
    ...mapState(["schedules"])
  },
  methods: {
    delete() {
      this.$store.dispatch("deleteSchedule", this.schedule);
    }
  }
};
</script>

<style scoped>
.card {
  margin-top: 30px;
  margin-bottom: 5em;
  border-radius: 10px;
  position: relative;
}
.btn-edit {
  background: none;
  border: none;
  color: blue;
  font-size: 15px;
  cursor: pointer;
  position: absolute;
  right: 40px;
}
.delete {
  position: absolute;
  right: 0;
}
</style>
