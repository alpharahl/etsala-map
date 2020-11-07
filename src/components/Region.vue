<template>
  <div >
    <div class="region mt-5">
      <h2>The Forge</h2>
      <div
        v-for="(constellation, name) in regions['The Forge'].constellations"
        :key="name"
      >
        <div class="d-flex justify-content-left pl-5">
          {{name}}
        </div>
        <div class="d-flex">
          <System
            v-for="(system, systemName) in constellation.systems"
            :key="systemName"
            :system="{...system, ...{name: systemName}}"
          ></System>
        </div>
      </div>
    </div>
    {{links}}
  </div>
</template>

<script>
  import System from "@/components/System";
  export default {
    name: "Region",
    components: {System},
    data(){
      return {
        regions: {
          'The Forge': {
            constellations: {
              'Etsala': {
                systems: {
                  'Kiainti': {
                    security: 0.5,
                    trigHoles: 1,
                    links: [
                      'Vasala',
                      'Otsela',
                      'Hentogaira',
                      'Waivalin'
                    ]
                  },
                  'Vasala': {
                    security: 0.5,
                    trigHoles: 2,
                    links: [
                      'Kiainti',
                      'Walvalin',
                      'Vouskiaho'
                    ]
                  },
                  'Vouskiaho': {
                    security: 0.5,
                    trigHoles: 2,
                    links: [
                      'Vasala',
                      'Uchoshi'
                    ]
                  },
                  'Uchoshi': {
                    security: 0.5,
                    trigHoles: 2,
                    links: [
                      'Vouskiaho',
                      'Mastakomon'
                    ]
                  },
                  'Mastakomon': {
                    security: 0.5,
                    trigHoles: 2,
                    links: [
                      'Uchoshi'
                    ]
                  }
                }
              }
            }
          }
        },
        links: []
      }
    },

    mounted(){

    }
  }
</script>

<style scoped>
</style>
