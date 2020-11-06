<template>
  <div id="app">
    <Region/>
  </div>
</template>

<script>
import Region from "@/components/Region";

export default {
  name: 'App',
  components: {
    Region,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 60px;
}
</style>
