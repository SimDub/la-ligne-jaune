<template>
  <div id="leaflet" >
    <p>{{latPosition}} Merde !!!</p>
    <button v-on:click="visible = !visible">{{visible?'pas toilette':'toilettes'}}</button>
    <button v-on:click="moiVisible = !moiVisible">{{moiVisible?'pas Michel':'Michel'}}</button>
    <button v-on:click="visiblePanneau = !visiblePanneau">{{visiblePanneau?'pas panneau':'panneaux'}}</button>
    <LMap :zoom="zoom" :center="[latPosition,lonPosition]" style="height: 80vh; width: 80vw">
      <LTileLayer :url="url" ></LTileLayer>
      <!-- <LMarker :lat-lng="marker" ></LMarker>  -->
      <LMarker v-if="visible" v-for="item in wc" :lat-lng="item" v-bind:key="item.id" >
          <l-icon
          :icon-anchor="staticAnchor"
          class-name="someExtraClass">
          <img src="./wc.png">
        </l-icon>
      </LMarker>
      <LMarker v-if="moiVisible" :lat-lng="[latPosition,lonPosition]" >
          <l-icon
          :icon-anchor="staticAnchor"
          class-name="someExtraClass">
          <div class="headline">{{ customText }}</div>
          <img src="./michel.png">
        </l-icon>
      </LMarker>

      <LMarker v-if="visiblePanneau" v-for="item in panneau" :lat-lng="item" v-bind:key="item.id" >
          <l-icon
          :icon-anchor="staticAnchor"
          class-name="someExtraClass">
          <img src="./panneau.png">
        </l-icon></LMarker>

    </LMap>

  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import Vue2Leaflet from 'vue2-leaflet'
import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

Vue.component('l-icon', LIcon)
Vue.component('l-map', LMap);
Vue.component('l-tilelayer', LTileLayer);
Vue.component('l-marker', LMarker);

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default{
  data() {
    return {
      zoom:15,
      center: [1, 1],
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      marker: [47.2173, -1.5534],
      markers:[[47.25,-1.553],[47.2, -1.54]],
      latPosition:'',
      lonPosition:'',
      wc:'',
      panneau:'',
      counter: 0,
      visible:true,
      visiblePanneau:true,
      moiVisible:true,
      // icon: ({
      //   iconUrl: './arbre.png',
      //   iconSize: [32, 37],
      //   iconAnchor: [1, 1]
      // }),
      staticAnchor: [1, 1],
      customText: 'Michel',
      iconSize: 2
    }
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

  navigator.geolocation.getCurrentPosition(position => {
    this.latPosition = position.coords.latitude;
    this.lonPosition = position.coords.longitude;
  })

  axios
    .get(
      "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_panneaux-message-variable-pmv-nantes-metropole&rows=300&facet=sens&facet=indic_temps_parcours"
    )
    .then(response => {
      const panneaux = response.data.records;
      console.log(panneaux);
      const wherePisspanneaux = panneaux.map(
        (panneau, index) => panneau.fields.location
      );
      console.log('testpanneau');
      this.panneau = wherePisspanneaux;
    });
},
};

</script>

<style>

html, body, #leaflet {
  margin: 0 auto;
}

</style>
