<template>
  <Layout>
    <div class="container is-fluid">
      <section class="hero is-light">
        <div class="hero-body">
          <div class="container has-text-centered">
            <g-image alt="Example image" src="~/assets/donut.jpg" width="240"/>
            <h1 class="title">Hello, world!</h1>
            <h2 class="subtitle">This is a simple example of a
              <a href="https://gridsome.org" target="_blank">Gridsome</a> site, deployed with
              <a href="https://zeit.co" target="_blank">Now</a>.
            </h2>
            <g-link to="/about">About this project</g-link>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="content">
          <div class="columns">
            <div class="column">
              <h3 class="title is-3">Active Project List ({{ $page.projects.edges.length }})</h3>
              <ul>
                <li v-for="edge in $page.projects.edges" :key="edge.node.id">{{ edge.node.title }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<page-query>
  query Projects {
    projects: allProjects {
      edges {
        node {
          id
          title
        }
      }
    }
  }
</page-query>

<script>
export default {};
</script>
