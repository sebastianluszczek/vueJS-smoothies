<template>
  <header class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <div class="container">
          <router-link v-bind:to="{ name: 'Index' }">
            <span class="nav-title">Smoothies</span>
          </router-link>
          <a href class="btn-floating btn-large halfway-fab pink">
            <router-link v-bind:to="{ name: 'AddSmoothie' }">
              <i class="material-icons">add</i>
            </router-link>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>

<style>
</style>