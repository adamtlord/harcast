<template>
  <Layout>
    <div class="container">
      <section class="hero">
        <div class="hero-body">
          <div class="container has-text-centered">
            <g-image alt="Example image" src="~/assets/donut.jpg" width="240"/>
            <h1 class="title">Hello, world!</h1>
            <h2 class="subtitle">
              This is a simple example of a
              <a href="https://gridsome.org" target="_blank">Gridsome</a> site, deployed with
              <a href="https://zeit.co" target="_blank">Now</a>.
            </h2>
            <g-link to="/about" class="button is-link">About this project</g-link>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="content">
          <div class="columns">
            <div class="column">
              <ClientList/>
            </div>
            <div class="column">
              <ProjectList/>
            </div>
            <div class="column">
              <PeopleList/>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<script>
import ProjectList from "~/components/ProjectList.vue";
import ClientList from "~/components/ClientList.vue";
import PeopleList from "~/components/PeopleList.vue";

export default {
  components: {
    ProjectList,
    ClientList,
    PeopleList
  }
};
</script>
