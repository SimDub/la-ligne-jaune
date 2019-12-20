<template>
  <div class="container">
    <div id="leaflet">
      <button
        v-on:click="wcProcheVisible = !wcProcheVisible"
      >{{wcProcheVisible?`wc les plus proches ${distWcProche} m... court !! `:'un mega pipi ?'}}</button>
      <button
        v-on:click="visible = !visible"
        :class="{green: visible, black: !visible}"
      >{{visible?'pas toilette':'toilettes'}}</button>
      <button
        v-on:click="moiVisible = !moiVisible"
        :class="{green: moiVisible, black: !moiVisible}"
      >{{moiVisible?'pas Michel':'Michel'}}</button>
      <button
        v-on:click="visiblePanneau = !visiblePanneau"
        :class="{green: visiblePanneau, black: !visiblePanneau}"
      >{{visiblePanneau?'pas panneau':'panneaux'}}</button>
      <div class="map-container">
        <LMap :zoom="zoom" :center="[latPosition,lonPosition]" style="height: 80vh; width: 80vw">
          <LTileLayer :url="url"></LTileLayer>
          <!-- <LMarker :lat-lng="marker" ></LMarker>  -->
          <LMarker v-if="wcProcheVisible" :lat-lng="wcProche">
            <l-icon :icon-anchor="staticAnchor" class-name="someExtraClass">
              <img src="./wc-or.png" />
            </l-icon>
          </LMarker>
          <LMarker v-if="visible" v-for="item in wc" :lat-lng="item" v-bind:key="item.id">
            <l-icon :icon-anchor="staticAnchor" class-name="someExtraClass">
              <img src="./wc.png" />
            </l-icon>
          </LMarker>
          <LMarker v-if="moiVisible" :lat-lng="[latPosition,lonPosition]">
            <l-icon :icon-anchor="staticAnchor" class-name="someExtraClass">
              <div class="headline">{{ customText }}</div>
              <img src="./michel.png" />
            </l-icon>
          </LMarker>

          <LMarker
            v-if="visiblePanneau"
            v-for="item in panneau"
            :lat-lng="item"
            v-bind:key="item.id"
          >
            <l-icon :icon-anchor="staticAnchor" class-name="someExtraClass">
              <img src="./panneau.png" />
            </l-icon>
          </LMarker>
        </LMap>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import Vue2Leaflet from "vue2-leaflet";
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

Vue.component("l-icon", LIcon);
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
      zoom: 15,
      center: [1, 1],
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      marker: [47.2173, -1.5534],

      markers: [[47.25, -1.553], [47.2, -1.54]],
      latPosition: "",
      lonPosition: "",
      wc: "",
      wcProche: "",
      panneau: "",
      counter: 0,
      visible: true,
      wcProcheVisible: false,
      visiblePanneau: true,
      moiVisible: true,

      // icon: ({
      //   iconUrl: './arbre.png',
      //   iconSize: [32, 37],
      //   iconAnchor: [1, 1]
      // }),
      staticAnchor: [1, 1],
      customText: "Michel",
      distWcProche: "",

      iconSize: 2
    };
  },
  methods: {
    megaPipi: function(position, wc) {
      const calculDistance = (lat1, lon1, lat2, lon2, unit) => {
        if (lat1 == lat2 && lon1 == lon2) {
          return 0;
        } else {
          var radlat1 = (Math.PI * lat1) / 180;
          var radlat2 = (Math.PI * lat2) / 180;
          var theta = lon1 - lon2;
          var radtheta = (Math.PI * theta) / 180;
          var dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          if (dist > 1) {
            dist = 1;
          }
          dist = Math.acos(dist);
          dist = (dist * 180) / Math.PI;
          dist = dist * 60 * 1.1515;
          if (unit == "K") {
            dist = dist * 1.609344;
          }
          if (unit == "N") {
            dist = dist * 0.8684;
          }
          return dist;
        }
      };

      const dist1 = wc.map((wcPos, index) =>
        calculDistance(position[0], position[1], wcPos[0], wcPos[1])
      );
      console.log(dist1);

      console.log(Math.min(...dist1));
      const indexProche = dist1.indexOf(Math.min(...dist1));
      console.log(indexProche);
      this.distWcProche = Math.round(Math.min(...dist1) * 1000);
      console.log(wc[indexProche]);
      this.wcProche = wc[indexProche];
    }
  },
  components: {
    LMap,
    LMarker,
    LTileLayer
  },
  async mounted() {
    await navigator.geolocation.getCurrentPosition(position => {
      this.latPosition = position.coords.latitude;
      this.lonPosition = position.coords.longitude;
    });
    await axios
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
        console.log("testpanneau");
        this.panneau = wherePisspanneaux;
      }),
      this.megaPipi([this.latPosition, this.lonPosition], this.wc);
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
#leaflet button {
  min-width: 125px;
  padding: 10px 15px;
  margin: 10px;
  border-radius: 10px;
  color: honeydew;
  font-weight: bold;
  border: solid 2px rgba(192, 186, 209, 0.342);
}
.green {
  background-color: rgb(35, 165, 79);
}
.black {
  background-color: rgba(10, 20, 14, 0.959);
}
#jaune {
  background-color: red;
}
.container {
  width: 75%;
  margin: auto;
}
.map-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10%;
  margin-bottom: 10%;
}
.leaflet-container {
  -moz-box-shadow: 1px 1px 20px 5px #ccc;
  -webkit-box-shadow: 1px 1px 20px 5px #ccc;
  -o-box-shadow: 1px 1px 20px 5px #ccc;
  box-shadow: 1px 1px 20px 5px #ccc;
  filter: progid:DXImageTransform.Microsoft.Shadow(color=#ccc, Direction=134, Strength=20);
  border-radius: 10px;
}
</style>
