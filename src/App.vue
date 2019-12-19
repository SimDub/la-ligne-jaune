<template>
  <div>
    <div id="app">
      <a href="/#/">accueil</a>
      <a href="/#/toilettes">Toilettes</a>
      <a href="/#/heremap">Here Map</a>
      <a href="/#/leaflet">Leaflet</a>
      <div id="app"></div>
      <router-view />
    </div>
  </div>
</template>

<script>
// import Test from './components/Test'
// import HereMap from './components/HereMap.vue'

/* eslint-disable */
export default {
  name: "App",
  components: {
    // HereMap,
    // Test,
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
