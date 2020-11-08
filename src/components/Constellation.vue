<template>
  <div class="left">
    <h3>{{name}}</h3>
    <div class="d-flex flex-wrap">
      <System
        v-for="(system, name) in constellation.systems"
        :key="name"
        :system="system"
        :name="name"
      />
    </div>
  </div>
</template>

<script>
  import System from "@/components/System";
  export default {
    name: "Constellation",
    components: {System},
    props: ['constellation', 'name']
  }
</script>

<style scoped>

  .left{
    text-align: left;
  }

</style>
