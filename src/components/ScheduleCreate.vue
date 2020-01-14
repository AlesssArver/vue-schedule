<template>
  <form @submit.prevent="createSchedule" class="field has-addons">
    <BaseInput type="text" v-model="schedule.title" />
    <BaseInput type="time" v-model="schedule.time" />
    <div class="control">
      <button class="button">Create</button>
    </div>
  </form>
</template>

<script>
import BaseInput from "./BaseInput";

export default {
  components: { BaseInput },
  data() {
    return {
      schedule: this.createFreshScheduleObject()
    };
  },
  methods: {
    createSchedule() {
      this.$store
        .dispatch("createSchedule", this.schedule)
        .then(() => {
          this.schedule = this.createFreshScheduleObject();
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    },
    createFreshScheduleObject() {
      return {
        id: "",
        name: "",
        surname: "",
        title: "",
        date: "",
        time: ""
      };
    }
  }
};
</script>

<style scoped>
.input-title {
  width: 300px;
}
</style>
