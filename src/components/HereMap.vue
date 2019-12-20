<template>
  <div class="container">
    <div id="hereMap">
      <div class="here-map">
          <div ref="map" style="height: 80vh; width: 80vw"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
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
      info: null,
      latPosition: "future latitude",
      lonPosition: "future longitude",
    };
  },
  mounted() {
    
    
    this.platform = new H.service.Platform({
      app_id: this.appId,
        app_code: this.appCode,
    });
    var layers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.$refs.map,
      layers.normal.map,
      {
        center: {lat: 47.207223, lng: -1.555592},
        zoom: 10,
      }
    );
    var events = new H.mapevents.MapEvents(this.map);
    var behavior = new H.mapevents.Behavior(events);
    var ui = H.ui.UI.createdDefault(this.map, layers);
  
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
    console.log("fhjdhj");
    navigator.geolocation.getCurrentPosition(position => {
      this.latPosition = position.coords.latitude;
      this.lonPosition = position.coords.longitude;
    });
    // add marker on map
    const berlinMarker = new H.map.Marker({
      lat: this.toilettelat,
      lng: this.toilettelon
    });
    this.map.addObject(berlinMarker);
  },
  watch: {
    theme(newVal, oldVal) {
        var tiles = this.platform.getMapTileService({ "type": "base" });
        var layer = tiles.createTileLayer(
            "maptile",
            newVal,
            256,
            "png",
            { "style": "default" }
        );
        this.map.setBaseLayer(layer);
    }
},
};
</script>

<style scoped>
html,
body,
#HereMap {
  height: 100px;
  margin: 0; 
}
.container {
  width: 75%;
  margin: auto;
}
.here-map {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10%;
  margin-bottom: 10%;
}
.hereMap-container {
  -moz-box-shadow: 1px 1px 20px 5px #ccc;
  -webkit-box-shadow: 1px 1px 20px 5px #ccc;
  -o-box-shadow: 1px 1px 20px 5px #ccc;
  box-shadow: 1px 1px 20px 5px #ccc;
  filter: progid:DXImageTransform.Microsoft.Shadow(color=#ccc, Direction=134, Strength=20);
  border-radius: 10px;
}</style>