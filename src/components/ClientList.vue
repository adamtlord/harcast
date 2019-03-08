<template>
  <div>
    <h3 class="title is-3">
      <font-awesome icon="broadcast-tower" :style="{ opacity: .5 }"/>
      Active Client List ({{clients.length}})
    </h3>
    <p>
      <span class="tag is-success">Fetched Live</span>
    </p>
    <ul>
      <li v-for="client in clients" :key="client.id">{{ client.name }}</li>
    </ul>
  </div>
</template>

<script>
import Harvest from '~/services/harvest';

const harvest = new Harvest();

export default {
  data() {
    return {
      clients: []
    };
  },
  mounted() {
    harvest.clients().then(response => (this.clients = response));
  }
};
</script>
