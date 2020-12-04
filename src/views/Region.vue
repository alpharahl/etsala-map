<template>
  <div class="region" >
    <h2>{{name}}</h2>
    <div v-if="!loading" class="d-flex justify-content-around flex-wrap">
      <Constellation
        class="constellation mb-3"
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

    computed:{
      systems(){
        return Object.values(this.region.constellation).flatMap(constellation => {
          return Object.keys(constellation.systems).flatMap(systemName => {
            const system = constellation.systems[systemName]
            return {
              ...system,
              name: systemName
            }
          })
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
  .constellation{
    max-width: 400px;
  }
</style>
