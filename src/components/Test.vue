<template>
  <div>
    <h1> Hello {{ person.name }} de {{ from }} </h1>
    <h1>Bienvenue sur la ligne jaune</h1>
    <br>
    <a href="/#/leaflet" class="link-btn">Suis le chemin ...</a>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data () {
    return {
      person: {
        firstname: 'Le Jaune',
        name: 'Michel'
      },
      from: 'Nantes',
    }
  }
}
</script>

<style>
#app .link-btn{
  min-width: 80px;
  text-decoration: none;
  display: inline-block;
  padding: 10px 15px;
  margin: 80px;
  border-radius: 10px;
  background-color: #FEDD03;
  color:#2A7344;
  font-weight: bold;
  border: solid 2px #2A7344;
  box-shadow:5px 5px 5px black;
}
#app .link-btn:hover{

  background-color: #2A7344;
  color:#FEDD03;
  border: solid 2px #FEDD03;
}
</style>
