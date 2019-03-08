<template>
    <div>
        <h3 class="title is-3">Active Project List ({{ $static.projects.edges.length }})</h3>
        <ul>
            <li v-for="edge in $static.projects.edges" :key="edge.node.id">{{ edge.node.title }}</li>
        </ul>
    </div>
</template>

<static-query>
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
</static-query>

<script>
export default {};
</script>
