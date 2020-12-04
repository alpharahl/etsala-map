<template>
  <div>
    <h2>Route to Jita</h2>
    <div class="d-flex justify-content-center flex-column">
      <System
        v-for="system in route"
        :system="system"
        :key="system.name"
        :name="system.name.replace(' ', '')"
      />
    </div>
  </div>
</template>

<script>
  import System from "@/components/System";
  export default {
    name: "JitaRoute",
    components: {System},
    data(){
      return {
        route: [
          {
            name: 'Mastakomon',
            security: 0.5,
            trigHoles: 2,
            trigSystems: ['Wirashoda', 'Otanuomi'],
          },
          {
            name: 'Uchoshi',
            security: 0.5,
            trigHoles: 2,
            trigSystems: ['Wirashoda', 'Otanuomi'],
          },
          {
            name: 'Vouskiaho',
            security: 0.5,
            trigHoles: 2,
            trigSystems: ['Wirashoda', 'Otanuomi'],
          },
          {
            name: 'Vasala',
            security: 0.5,
            trigHoles: 2,
            trigSystems: ['Wirashoda', 'Otanuomi'],
          },
          {
            name: 'Kiainti',
            security: 0.5,
            trigHoles: 1,
            trigSystems: [
              'Otanuomi'
            ],
          },
          {
            name: 'Hentogaira',
            security: 0.6,
            trigHoles: 1,
            trigSystems: [
              'Otanuomi'
            ],
          },
          {
            name: 'Akkilen',
            security: 0.7,
            trigHoles: 1,
            trigSystems: [
              'Otanuomi'
            ],
          },
          {
            name: 'Vattuolen',
            security: 0.7,
            trigHoles: 0,
            trigSystems: [],
          },
          {
            name: 'Uoyonen',
            security:  0.7,
            trigHoles: 0,
            trigSystems: [],
          },
          {
            name: 'Gekutami',
            security: 0.7,
            trigHoles: 0,
            trigSystems: [],
          },
          {
            name: 'Jakanerva',
            security: 0.7,
            trigHoles: 0,
            trigSystems: [],
          },
          {
            name: 'Saisio',
            security: 0.7,
            trigHoles: 1,
            trigSystems: [
              'Otela'
            ],
          },
          {
            name: 'Nomaa',
            security: 0.6,
            trigHoles: 1,
            trigSystems: [
              'Otela'
            ],
          },
          {
            name: 'Poinen',
            security: 0.6,
            trigHoles: 1,
            trigSystems: [
              'Otela'
            ],
          },
          {
            name: 'Josameto',
            security: 0.6,
            trigHoles: 1,
            trigSystems: [
              'Otela'
            ],
          },
          {
            name: 'New Caldari',
            security: 1.0,
            trigHoles: 3,
            trigSystems: [
              'Sakenta',
              'Otela',
              'Arvasaras',
            ],
          },
          {
            name: 'Jita',
            security: 1.0,
            trigHoles: 2,
            trigSystems: [
              'Sakenta',
              'Otela'
            ],
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
