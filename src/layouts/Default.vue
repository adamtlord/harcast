<template>
  <div class="layout">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <g-link :to="{ name: 'home' }" class="navbar-item">Harcast</g-link>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start">
            <g-link class="navbar-item" :to="{ name: 'home' }">Home</g-link>
            <g-link class="navbar-item" :to="{ name: 'about' }">About</g-link>
          </div>
        </div>
      </div>
    </nav>
    <slot/>
  </div>
</template>