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
      {{ new Date().toLocaleString() }}
      <transition-group name="slide-up" tag="div">
        <ScheduleCard
          v-for="schedule in schedules"
          :key="schedule.id"
          :schedule="schedule"
        />
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
import ScheduleCard from "../components/ScheduleCard";

export default {
  components: { ScheduleCreate, ScheduleCard },
  props: { schedule: Object },
  created() {
    this.perPage = 3;

    this.$store.dispatch("fetchSchedules", {
      perPage: this.perPage,
      page: this.page
    });
  },
  computed: {
    isScheduleOpen() {
      return this.$route.name === "schedule";
    },
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.schedulesTotal > this.page * this.perPage;
    },
    ...mapState(["schedules/schedules"])
  }
};
</script>

<style>
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
