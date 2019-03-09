<template>
  <div>
    <h3 class="title is-3">
      Harvest Client List <span v-if="clients.length">({{clients.length}})</span>
    </h3>
    <ul v-if="clients.length">
      <li v-for="client in clients" :key="client.id">{{ client.name }} <span class="has-text-grey-light">({{client.id}})</span></li>
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
      clients: []
    };
  },
  mounted() {
    axios.get('https://localhost:3000/harvest/clients', {
      params: {
        is_active: true
      }
    })
    .then(clients => {
      this.clients = clients.data
    }
    )
  }
};
</script>
