<template>
  <div>
    <h1> Hello test {{ person.name }} de {{ from }} </h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      person: {
        firstname: 'robert',
        name: 'albert'
      },
      from: 'nantes'
    }
  }
}
</script>

<style>
</style>
