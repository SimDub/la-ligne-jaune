<template>
  <div>
    <p>My position latitude {{latPosition}} longitude {{lonPosition}}</p>
    <button v-on:click="distance()">ma fonction</button>{{resultmafonction}}

    <p />
    <ul>
      <li v-for="item in info" v-bind:key="item.id">toilette : Latitude {{ item[0] }} longitude {{ item[1] }}</li>
    </ul>
    {{info}}
    <p>test map bordel d'axios !</p>
  </div>
</template>

<script>
// import Vue from 'vue'
import Leaflet from './Leaflet'
// import vue from 'vue'
const axios = require('axios')
/* eslint-disable */

export default {
  data() {
    return {
      info: null,
      latPosition: "future latitude",
      lonPosition: "future longitude",
      resultmafonction:25
    };
  },
  methods: {
    distance:function(){ 
    
    const position = [47.21,-1.54]
    const wc =[[47.26,-1.44],[47.56,-1.44],[48.26,-3.44]]

    const dist1 = wc.map((wcPos,index)=> calculDistance(position[0],position[1],wcPos[0],wcPos[1]))
    console.log(dist1)
    
    const calculDistance = (lat1, lon1, lat2, lon2, unit) =>{

      lat1 = position[0]
      lat2= position[1]

	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
    console.log(dist)
		return dist;
	}

    }
},
    mafonction: function () {
      console.log('test')
    }
  },
  props: {
    },
  mounted() {
    axios
      .get(
        "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_toilettes-publiques-nantes-metropole&facet=commune&facet=pole&facet=type&facet=automatique&facet=acces_pmr"
      )
      .then(response => {
        const toilettes = response.data.records;
        console.log(toilettes);
        const wherePiss = toilettes.map(
          (toilette, index) => toilette.fields.location
        );
        console.log(wherePiss);
        this.info = wherePiss;
      });
    navigator.geolocation.getCurrentPosition(position => {
      this.latPosition = position.coords.latitude;
      this.lonPosition = position.coords.longitude;
    });
  },
    components: {
    Leaflet
  },
};

</script>

<style>
</style>