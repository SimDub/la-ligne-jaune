<template>
  <div>
    <p>{{ wcPosition }}</p>
  <div class="here-map">
  <div ref="map" v-bind:style="{ width: width, height: height }"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'

export default {
  name: "HereMap",
    props: {
      appId: String,
      appCode: String,
      theme: String,
      lat: String,
      lng: String,
      width: String,
      height: String,
      toilettelat: String,
      toilettelon: String
    },
  data() {
    return {
      map: {},
      platform: {},
      wcPosition: null, 
      latPosition: 'future latitude',
      lonPosition: 'future longitude'
    }
  },
  props: {
    appId: String,
    appCode: String,
    lat: String,
    lng: String,
    width: String,
    height: String,
    toilettelat:String,
    toilettelon:String
  },
  created() {
    this.platform = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode
    });
  },
  mounted() {
    
    this.platform = new H.service.Platform({
      app_id: this.appId,
        app_code: this.appCode,
    });
    var layers = this.platform.createDefaultLayers();
    this.map = new H.Map(
    this.$refs.map,
    this.platform.createDefaultLayers().normal.map,
    {
    zoom: 10,
    center: { lng: this.lng, lat: this.lat },
    pixelRatio: window.devicePixelRatio || 1
  }
  );

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
      this.wcPosition = wherePiss;
    });
    console.log("axios");

  //add marker on map 
  // for (i=0; i< wherePiss[length-1]; i++){
  //   console.log('test wc')
  //   const wc = new H.map.Marker({
  //     lat:this.wherePiss[i][i],
  //     lng:this.wherePiss[i][i+1]
  //   })
  //   return (this.map.addObject(wc))
  //   console.log('wc?')
  //   }
  // }

  const wcMarkerTest = new H.map.Marker({   
  lat:this.toilettelat,
  lng:this.toilettelon
  });
  this.map.addObject(wcMarkerTest)
  const wcMarkerTest2 = new H.map.Marker({   
  lat:47.28,
  lng:-1.50
  });
  this.map.addObject(wcMarkerTest2)
  }   
}
</script>

<style scoped></style>