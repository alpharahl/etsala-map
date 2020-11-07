<template>
  <div
    class="d-flex justify-content-center m-2 system-container"
  >
    <b-popover
      :target="`system-button-${system.name}`"
      :title="system.name"
      triggers="hover"
      placement="right"
      @show="() => {$bus.$emit('highlight', system.name)}"
      @hide="() => {$bus.$emit('highlightOff')}"
    >
      Can have {{system.trigHoles}} Trig Wormholes.
      Potential Links:
      <span
        v-for="(link, index) in system.trigSystems"
        :key="link"
      >
        {{link}}
        <span v-if="index < system.trigSystems.length - 1">
          |
        </span>
      </span>
    </b-popover>
    <b-button
      class="system px-2 py-1 d-flex justify-content-center"
      :id="`system-button-${system.name}`"
      :class="{
        danger,
        singleTrig: system.trigHoles === 1,
        twoTrig: system.trigHoles === 2,
        noTrig: system.trigHoles === 0,
        threeTrig: system.trigHoles === 3,
      }"
      @click="() => {$bvModal.show(`${system.name}-reporter`)}"
    >
      <div class="security mr-auto pr-1">
        {{system.security}}
      </div>
      <div>
        {{system.name}}
      </div>
    </b-button>
    <b-modal :id="`${system.name}-reporter`" :title="`Report ${system.name}`">
      <div class="d-flex justify-content-around">
        <b-button
          @click="recordSighting"
          variant="danger"
        >
          Report seeing trigs
        </b-button>
        <b-button
          @click="recordClear"
          variant="success"
        >
          Report clear of trigs
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import firebase from 'firebase';
  export default {
    name: "System",
    props: [
      'system',
    ],
    data(){
      return {
        lastSeen: null,
      }
    },
    methods: {
      recordSighting(){
        firebase.database()
          .ref(`reports/${this.system.name}`)
          .update({lastSeen: new Date})
      },

      recordClear(){
        firebase.database()
          .ref(`reports/${this.system.name}/lastSeen`)
          .remove()
      }
    },

    computed: {
      danger(){
        if (!this.lastSeen){
          return false;
        }
        if (this.lastSeen > new Date - (60 * 60 * 1000 * 12)){
          return true;
        }
        return false;
      }
    },

    mounted(){
      firebase.database()
        .ref(`reports/${this.system.name}`)
        .on('value', (snapshot) => {
          const date = snapshot.val();
          console.log(date)
          if (date) {
            this.lastSeen = Date.parse(date.lastSeen);
          } else {
            this.lastSeen = null;
          }
        })
    }
  }
</script>

<style scoped>
  .system{
    border-radius: 20px;
    background-color: #ccc;
    color: #000;
    min-width: 150px;
  }

  .singleTrig{
    border: 2px #18bc14 solid;
    box-shadow: 2px 2px 8px #18bc14;
  }

  .danger {
    background-color: #ff2038;
    color: #ffffff;
  }
  .twoTrig {
    border: 2px #ff9d31 solid;
    box-shadow: 2px 2px 8px #ff9d31;
  }

  .threeTrig{
    border: 2px #ff2038 solid;
    box-shadow: 2px 2px 8px #ff2038;
  }

  .security{
    border-right: 2px solid black;
  }

</style>
