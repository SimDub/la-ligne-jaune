<template>
  <div>
    <div id="app">
      <img src="./components/logo.png" class="logo" />
      <a href="/#/" class="link-navbar">Accueil</a>
      <a href="/#/heremap" class="link-navbar">Here Map</a>
      <a href="/#/leaflet" class="link-navbar">Plan de survie</a>
      <div id="app"></div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Test from "./components/Test";
import HereMap from "./components/HereMap.vue";
/* eslint-disable */
export default {
  name: "app",
  data() {
    return {
      theme: "normal.day"
    };
  },
  components: {
    HereMap,
    Test
  },
  methods: {
    switchTheme(theme) {
      this.theme = theme;
    }
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
#app .link-navbar {
  min-width: 80px;
  text-decoration: none;
  display: inline-block;
  padding: 10px 15px;
  margin: 10px;
  border-radius: 10px;
  background-color: rgb(30, 71, 255);
  color: honeydew;
  font-weight: bold;
  border: solid 2px rgba(192, 186, 209, 0.342);
}
#app .link-navbar:hover {
  text-decoration: underline;
}
#app .logo {
  width: 200px;
  height: 200px;
}
#app a {
  position: relative;
  top: -100px;
}
@media (max-width: 576px) {
  #app a {
    top: 0px;
  }
  #app .logo{
    display: none;
  }
}

</style>