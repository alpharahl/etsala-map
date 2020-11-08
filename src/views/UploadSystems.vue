<template>
  <div>
    Nothing to see here
    <b-btn @click="uploadSystems">Systems</b-btn>
  </div>
</template>

<script>
  import firebase from 'firebase';
  export default {
    name: "UploadSystems",
    methods: {
      uploadSystems(){
        firebase.database().ref('systems').update(this.systems)
      }
    },

    computed:{
      systems(){
        let systems = {}
        Object.keys(this.regions).forEach(regionName => {
          const region = this.regions[regionName];
          Object.keys(region.constellations).forEach(constellationName => {
            const constellation = region.constellations[constellationName];
            Object.keys(constellation.systems).forEach(systemName => {
              const system = constellation.systems[systemName]
              systems[systemName] = {
                ...system,
                constellation: constellationName,
                region: regionName
              }
            })
          })
        })
        return systems;
      }
    },

    data(){
      return {
        regions: null,
      }
    },

    mounted(){
      // firebase
      //   .database()
      //   .ref('regions')
      //   .once('value', snapshot => {
      //     this.regions = snapshot.val();
      //   })
    }
  }
</script>

<style scoped>

</style>
