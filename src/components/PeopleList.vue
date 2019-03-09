<template>
  <div>
    <h3 class="title is-3">
      Forecast People <span v-if="people.length">({{people.length}})</span>
    </h3>
    <ul v-if="people.length">
      <li v-for="person in people" :key="person.id">{{ person.first_name }} {{ person.last_name }} <span class="has-text-grey-light">({{person.id}})</span></li>
    </ul>
    <p v-else>
      <font-awesome icon="spinner" spin />
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      people: []
    };
  },
  mounted() {
    axios.get('/api/forecast/people')
    .then(people => {
      this.people = people.data.filter(person => !person.archived)
    }
    )
  }
};
</script>
