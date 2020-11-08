<template>
  <div>
    <h2>Active Trig systems in the last 12 hours</h2>
    <div class="d-flex flex-wrap">
      <System
        v-for="(system, name) in systems"
        :name="name"
        :system="system"
        :key="name"
      />
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import System from "@/components/System";

  export default {
    name: "Reports",
    components: {System},
    data(){
      return {
        reportedSystemNames: [],
        systems: {}
      }
    },

    methods: {
      calculateSystems(){
        this.systems = {}
        console.log('Reported:', this.reportedSystemNames)
        this.reportedSystemNames.forEach(name => {
          firebase.database().ref(`systems/${name}`).once('value', snapshot => {
            console.log(snapshot.val())
            const system = snapshot.val();
            this.$set(this.systems, name, system);
          })
        })
      }
    },

    mounted(){
      firebase
        .database()
        .ref(`reports`)
        .on('value', snapshot => {
          this.reportedSystemNames = Object.keys(snapshot.val()).filter(name => {
            return Date.parse(snapshot.val()[name].lastSeen) > new Date - (60 * 60 * 1000 * 12)
          })
          this.calculateSystems();
        })
    }
  }
</script>

<style scoped>

</style>
