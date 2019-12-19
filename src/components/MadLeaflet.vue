<template>
  <div style="height: 100%; width: 100%">
    <div class="info" style="height: 15%">
      <span>Center: {{ center }}</span>
      <span>Zoom: {{ zoom }}</span>
      <span>Bounds: {{ bounds }}</span>
    </div>
    <LMap
      style="height: 500px; width: 500px"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <LTileLayer :url="url"></LTileLayer>
    </LMap>
  </div>
</template>
<script>
import Vue from "vue";
import { LMap, LTileLayer } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue
export default {
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 3,
      center: [47.41322, -1.219482],
      bounds: null
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    }
  },
  components: {
    LMap,
    LTileLayer
  }
};
</script>





