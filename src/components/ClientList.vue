<template>
  <div>
    <h3 class="title is-3"><font-awesome icon="broadcast-tower" :style="{ opacity: .5 }"/> Active Client List ({{clients.length}})</h3>
    <p><span class="tag is-success">Fetched Live</span></p>
    <ul>
      <li v-for="client in clients" :key="client.id">{{ client.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

const token = '870202.pt.BnltfZlVKzZNfHWTlLnVpEZfadd1fZHRwl82odL6-OAoCHri3uGHgNt6ioKVIWlAkPi1cJGUnsGVLN9Su9an-g';
const accountId = '563649';

export default {
  data() {
    return {
      clients: []
    };
  },
  mounted() {
    axios
      .get('https://api.harvestapp.com/v2/clients', {
        headers: {
          Authorization: `Bearer ${token}`,
			    'Harvest-Account-Id': accountId,
        },
        params: {
          is_active: true
        }
      })
      .then(response => (this.clients = response.data.clients));
  }
};
</script>
