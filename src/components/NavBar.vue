<template>
  <div id="nav" class="nav">
    <router-link to="/">Linnworks Test (powered by Vue)</router-link>
    <nav>
      <router-link class="vue" :to="{ name: 'category-list' }"
        >List</router-link
      >
      |
      <router-link :to="{ name: 'category-create' }">Create</router-link>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.nav > .vue {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none;
}
.nav a {
  color: #39b982;
}
</style>
