<template>
<div>
  <div id="app">
    <a href="/#/" >accueil</a>
    <a href="/#/toilettes" > Toilettes </a>
    <a href="/#/heremap" >Here Map</a>
  <div id="app">
  
  </div>
  <router-view/>
  </div>
  <HereMap
    appId="isowPSLYsaONp0u6FBUW"
    appCode="Bhe5dQ-D4Nd1usIC5XOUJ2yKETeImpLsKzn5mSdXvlU"
    lat="47.2135655"
    lng="-1.5496263"
    width="70%"
    height="835px"
    toilettelat="47.2673084419"
    toilettelon="-1.4408557121799999" />
  </div>
</template>

<script>
import Test from './components/Test'
import Toilettes from './components/Toilettes'
import HereMap from './components/HereMap.vue'

export default {
  name: 'App',
  components:{
    HereMap,
    Test,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
