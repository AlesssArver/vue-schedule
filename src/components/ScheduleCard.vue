<template>
  <div class="card">
    <div class="card-header">
      <button class="delete" @click="deleteSchedule" />
    </div>
    <div class="card-content">
      <div class="content">
        <div class="columns">
          <div class="column">
            <input
              type="text"
              class="input"
              :value="schedule.title"
              placeholder="Input Title"
              @change="editSchedule()"
              @keyup.enter="editSchedule()"
              require
            />
          </div>
          <div class="column">
            <input
              type="text"
              class="input"
              :value="schedule.time"
              placeholder="Input Time"
              @change="editSchedule()"
              @keyup.enter="editSchedule()"
              require
            />
          </div>
          <div class="column is-1">
            <input
              type="checkbox"
              class="checkbox"
              :checked="schedule.done"
              @change="editSchedule()"
              @click="editSchedule()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    schedule: {
      type: Object,
      requre: true
    }
  },
  methods: {
    editSchedule() {
      this.$store.dispatch("editSchedule", this.schedule.id).catch(error => {
        console.log("Error: " + error);
      });
    },
    deleteSchedule() {
      this.$store.dispatch("deleteSchedule", this.schedules);
    }
  }
};
</script>

<style scopped>
.checkbox {
  width: 20px;
  height: 20px;
}
</style>
