<template>
  <div class="here-map">
    <div ref="map" v-bind:style="{ width: width, height: height }"></div>
  </div>
</template>

<script>
export default {
  name: "HereMap",
  data() {
    return {
      map: {},
      platform: {},
      info: null, 
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
    
    this.map = new H.Map(
    this.$refs.map,
    this.platform.createDefaultLayers().normal.map,
    {
    zoom: 10,
    center: { lng: this.lng, lat: this.lat },
    pixelRatio: window.devicePixelRatio || 1
  }
  );


  //add marker on map
  const berlinMarker = new H.map.Marker({
  lat:this.toilettelat,
  lng:this.toilettelon
  });
  this.map.addObject(berlinMarker)

  }
}
</script>

<style scoped></style>