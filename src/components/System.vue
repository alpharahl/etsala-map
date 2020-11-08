<template>
  <div
    class="d-flex justify-content-center m-2 system-container"
    :id="name"
  >
    <b-button
      class="system px-2 py-1 d-flex justify-content-center"
      style="z-index: 2"
      :id="`system-button-${name}`"
      :class="{
        danger,
        singleTrig: trigConnections.length === 1,
        twoTrig: trigConnections.length === 2,
        noTrig: trigConnections.length === 0,
        threeTrig: trigConnections.length === 3,
        fourTrig: trigConnections.length > 3,
      }"
      @mouseenter="highlight=true"
      @mouseleave="highlight=false"
      @click="() => {$bvModal.show(`${name}-reporter`)}"
    >
      <div
        class="security mr-auto pr-1"
        :class="`security-${String(oneDecimalSecurity).replace('.', '')}`"
      >
        {{oneDecimalSecurity}}
      </div>
      <div>
        {{name}}
      </div>
    </b-button>
    <b-modal :id="`${name}-reporter`" :title="`Report ${name}`">
      <div>
        <h2>Potential Trig Systems</h2>
        <ul>
          <li
            v-for="(link) in trigConnections"
            :key="link"
          >
            {{link}}
          </li>
        </ul>
      </div>
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
    <svg class="svg" v-if="highlight">
      <line
        v-for="(link, index) in links"
        :key="index"
        :x1="link.x1"
        :x2="link.x2"
        :y1="link.y1"
        :y2="link.y2"
        :style="`stroke:rgb(255,0,0);stroke-width:2;z-index:-1;`"
      />
    </svg>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import trigInfluence from '@/assets/trigInfluence';
  export default {
    name: "System",
    props: [
      'system',
      'name'
    ],
    data(){
      return {
        lastSeen: null,
        trigConnections: [],
        links: [],
        highlight: false
      }
    },
    methods: {
      recordSighting(){
        firebase.database()
          .ref(`reports/${this.name}`)
          .update({lastSeen: new Date})
      },

      recordClear(){
        firebase.database()
          .ref(`reports/${this.name}/lastSeen`)
          .remove()
      },

      setupLinks(){
        const startPos = this.$el.getBoundingClientRect()
        this.linkedSystems.forEach(systemName => {
          const targetPoint = document.getElementById(systemName)
          if (targetPoint){
            // System is in region
            const targetPos = targetPoint.getBoundingClientRect();
            console.log(targetPos, startPos)
            this.links.push({
              x1: startPos.x + (startPos.width / 2),
              x2: targetPos.x + (targetPos.width / 2),
              y1: startPos.y + (startPos.height / 2),
              y2: targetPos.y + (targetPos.height / 2),
            })
          } else {
            // system is out of region
          }
        })
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
      },

      linkedSystems(){
        return Object.values(this.system.stargates).map(gate => gate.destination)
      },

      oneDecimalSecurity(){
        return this.system.security.toFixed(1);
      }
    },

    mounted(){
      firebase.database()
        .ref(`reports/${this.name}`)
        .on('value', (snapshot) => {
          const date = snapshot.val();
          if (date) {
            this.lastSeen = Date.parse(date.lastSeen);
          } else {
            this.lastSeen = null;
          }
        })

      this.trigConnections =  Object.keys(trigInfluence).filter(name => {
        const systems = trigInfluence[name];
        return systems.includes(this.name);
      })

      this.$nextTick(() => {
        // wait until next tick so all items are drawn
        this.setupLinks();
      })
    }
  }
</script>

<style scoped>

  .svg{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  .security-0{
    color: #920212;
  }

  .security-01{
    color: #921b05;
  }

  .security-02{
    color: #922d00;
  }

  .security-03{
     color: #924208;
  }

  .security-04{
    color: #925d05;
  }

  .security-05{
    color: #928100;
  }

  .security-06{
    color: #6c9205;
  }

  .security-07{
    color: #3f9205;
  }

  .security-08{
    color: #0a9208;
  }

  .security-09{
    color: #0e9249;
  }

  .security-1{
    color: #008992;
  }

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
  .fourTrig {
    border: 2px #ff06d1 solid;
    box-shadow: 2px 2px 8px #ff06d1;
  }

  .threeTrig{
    border: 2px #ff2038 solid;
    box-shadow: 2px 2px 8px #ff2038;
  }

  .security{
    border-right: 2px solid black;
    font-weight: 700;
  }

</style>
