<template>
  <div>
    <div id="app">
      <a href="/#/">accueil</a>
      <a href="/#/toilettes">Toilettes</a>
      <a href="/#/heremap">Here Map</a>
      <div id="app"></div>
      <router-view />
    </div>
      <HereMap v-bind:theme=theme appId="T0ZRvqFl3EPBagnQo8t9" appCode="oCnrou0zSa-FFEiqcRA7lnWjc-MlLwWJDAh747oAemk" />
      <br />
      <button v-on:click="switchTheme('normal.day')">Normal - Day</button>
      <button v-on:click="switchTheme('normal.day.grey')">Normal - Day (Grey)</button>
      <button v-on:click="switchTheme('normal.day.transit')">Normal - Day (Transit)</button>
      <button v-on:click="switchTheme('normal.night')">Normal - Night</button>
      <button v-on:click="switchTheme('normal.night.grey')">Normal - Night (Grey)</button>
      <button v-on:click="switchTheme('reduced.night')">Reduced - Night</button>
      <button v-on:click="switchTheme('reduced.day')">Reduced - Day</button>
  </div>
</template>

<script>
import Test from './components/Test'
import HereMap from './components/HereMap.vue'
/* eslint-disable */
export default {
  name: "app",
  data() {
    return {
      theme: 'normal.day'
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
  },
};
</script>

<style>
    body {
        background-color: #F0F0F0;
    }
</style>
