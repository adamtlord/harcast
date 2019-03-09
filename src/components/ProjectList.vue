<template>
  <div>
    <h3 class="title is-3">Forecast Project List
      <span v-if="projects.length">({{projects.length}})</span>
    </h3>
    <ul v-if="projects.length">
      <li v-for="project in projects" :key="project.id">
        {{ project.name }}
        <span class="has-text-grey-light">({{project.id}})</span>
        <span v-if="project.client" class="has-text-weight-semibold is-size-7"><br>{{ project.client.name }}</span>
      </li>
    </ul>
    <p v-else>
      <font-awesome icon="spinner" spin/>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      projects: []
    };
  },
  mounted() {
    axios.get('https://localhost:3000/forecast/projects').then(projects => {
      this.projects = projects.data;
    });
  }
};
</script>
