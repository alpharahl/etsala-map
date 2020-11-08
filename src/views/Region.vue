<template>
  <div class="region" >
    <h2>{{name}}</h2>
    <div v-if="!loading">
      <Constellation
        v-for="(constellation, name) in region.constellations"
        :key="name"
        :constellation="constellation"
        :name="name"
      />
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import Constellation from "@/components/Constellation";
  export default {
    name: "Region",
    components: {Constellation},
    props: ['name'],

    data(){
      return {
        loading: true,
        region: null,
      }
    },

    methods:{
      loadPage(){
        console.log('Loading new data')
        this.loading=true;
        firebase
          .database()
          .ref(`regions/${this.name}`)
          .on('value', (snapshot) => {
            this.region = snapshot.val();
            this.loading = false;
          })

      }
    },

    mounted(){
      this.loadPage();
    },

    watch: {
      name(){
        this.loadPage();
      }
    }
  }
</script>

<style scoped>
</style>
