<template>
  <!-- prettier-ignore -->
  <div>
    <div class="header-decoration"></div>
    <div id="app">
      <NavBar></NavBar>
      <router-view />
    </div>
</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>
<style>
.header-decoration {
  background: linear-gradient(-90deg, #84cf6a, #16c0b0);
  height: 60px;
  margin-bottom: 15px;
}

#app {
  box-sizing: border-box;
  width: 964px;
  padding: 0 20px 20px;
  margin: 0 auto;
}
a {
  color: #39b982;
  font-weight: 600;
  background-color: transparent;
}
</style>
