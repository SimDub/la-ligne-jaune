<template>
  <div class="container">
    <div id="leaflet">
      <p>{{latPosition}} Merde !!!</p>
      <button v-on:click="visible = !visible">{{visible}}</button>
      <div class="map-container">
        <LMap :zoom="zoom" :center="[latPosition,lonPosition]" style="height: 600px; width: 800px">
          <LTileLayer :url="url"></LTileLayer>
          <!-- <LMarker :lat-lng="marker" ></LMarker>  -->
          <LMarker v-if="visible" v-for="item in wc" :lat-lng="item" v-bind:key="item.id"></LMarker>
          <LMarker :lat-lng="[latPosition,lonPosition]" id="jaune"></LMarker>
        </LMap>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import Vue2Leaflet from "vue2-leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

Vue.component("l-map", LMap);
Vue.component("l-tilelayer", LTileLayer);
Vue.component("l-marker", LMarker);

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  data() {
    return {
      zoom: 12,
      center: [1, 1],
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      marker: [47.2173, -1.5534],
      markers: [[47.25, -1.553], [47.2, -1.54]],
      latPosition: "",
      lonPosition: "",
      wc: "",
      counter: 0,
      visible: true
    };
  },
  components: {
    LMap,
    LMarker,
    LTileLayer
  },
  mounted() {
    axios
      .get(
        "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_toilettes-publiques-nantes-metropole&q=nantes&rows=300&facet=commune&facet=pole&facet=type&facet=automatique&facet=acces_pmr"
      )
      .then(response => {
        const toilettes = response.data.records;
        console.log(toilettes);
        const wherePiss = toilettes.map(
          (toilette, index) => toilette.fields.location
        );
        console.log(wherePiss);
        this.wc = wherePiss;
      });
    console.log("fhjdhj");

    navigator.geolocation.getCurrentPosition(position => {
      this.latPosition = position.coords.latitude;
      this.lonPosition = position.coords.longitude;
    });
  }
};
</script>

<style>
html,
body,
#leaflet {
  height: 100px;
  margin: 0;
}
#jaune {
  background-color: red;
}
.container {
  width: 75%;
  margin: auto;
}
.map-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10%;
}
.leaflet-container{
  -moz-box-shadow: 1px 1px 20px 5px #ccc;
  -webkit-box-shadow: 1px 1px 20px 5px #ccc;
  -o-box-shadow: 1px 1px 20px 5px #ccc;
  box-shadow: 1px 1px 20px 5px #ccc;
  filter:progid:DXImageTransform.Microsoft.Shadow(color=#ccc, Direction=134, Strength=20);
}
</style>
