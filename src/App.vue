<template>
  <div>
    <div id="app">
      <a href="/#/" class="link-navbar">accueil</a>
      <a href="/#/toilettes" class="link-navbar">Toilettes</a>
      <a href="/#/heremap" class="link-navbar">Here Map</a>
      <a href="/#/leaflet" class="link-navbar">Leaflet</a>
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

#app .link-navbar{
  min-width: 80px;
  text-decoration: none;
  display: inline-block;
  padding: 10px 15px;
  margin: 10px;
  border-radius: 10px;
  background-color: rgb(30, 71, 255);
  color:honeydew;
  font-weight: bold;
  border: solid 2px rgba(192, 186, 209, 0.342);
}

#app .link-navbar:hover{
  text-decoration: underline;
}
</style>
