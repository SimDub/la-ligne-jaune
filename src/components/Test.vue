<template>
  <div>
    <h1> Hello {{ person.name }} de {{ from }} </h1>
    <img src="./logo.png">
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
</style>
