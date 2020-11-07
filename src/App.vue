<template>
  <div id="app">
    <JitaRoute/>
  </div>
</template>

<script>
// import Region from "@/components/Region";
import JitaRoute from "@/components/JitaRoute";
import firebase from 'firebase';

export default {
  name: 'App',
  components: {
    JitaRoute,
  },

  mounted(){
    firebase.auth().signInAnonymously().then((user) => {
      this.$user = user;
    })
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
