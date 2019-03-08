<template>
  <div>
    <h3 class="title is-3">
      <font-awesome icon="broadcast-tower" :style="{ opacity: .5 }"/>
      Active Client List <span v-if="clients.length">({{clients.length}})</span>
    </h3>
    <p>
      <span class="tag is-success">Fetched Live</span>
    </p>
    <ul v-if="clients.length">
      <li v-for="client in clients" :key="client.id">{{ client.name }}</li>
    </ul>
    <p v-else>
      <font-awesome icon="spinner" spin />
    </p>
  </div>
</template>

<script>
import HarvestClients from '~/services/harvestClients';

export default {
  data() {
    return {
      clients: []
    };
  },
  mounted() {
    this.clients = HarvestClients();
  }
};
</script>
