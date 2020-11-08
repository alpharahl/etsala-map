<template>
  <b-navbar
    toggleable="lg"
    type="dark"
  >
    <b-navbar-brand :to="{name: 'Home'}">Etsala Legion Map</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item-dropdown text="Region">
          <b-dropdown-item
            v-for="region in regions"
            :key="`region-dd-${region}`"
            :to="{name: 'Region', params: {name: region}}"
          >
            {{region}}
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item :to="{name: 'Reports'}">Reported Systems</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    name: "Navbar",
    data(){
      return {
        regions: [
          'Aridia',
          'BlackRise',
          'Branch',
          'Cache',
          'Catch',
          'CloudRing',
          'CobaltEdge',
          'Curse',
          'Deklein',
          'Delve',
          'Derelik',
          'Detorid',
          'Devoid',
          'Domain',
          'Esoteria',
          'Essence',
          'EtheriumReach',
          'Everyshore',
          'Fade',
          'Feythabolis',
          'Fountain',
          'Geminate',
          'Genesis',
          'GreatWildlands',
          'Heimatar',
          'Immensea',
          'Impass',
          'Insmother',
          'Kador',
          'Khanid',
          'Kor-Azor',
          'Lonetrek',
          'Malpais',
          'Metropolis',
          'MoldenHeath',
          'Oasa',
          'Omist',
          'OuterPassage',
          'OuterRing',
          'ParagonSoul',
          'PeriodBasis',
          'PerrigenFalls',
          'Placid',
          'Pochven',
          'Providence',
          'PureBlind',
          'Querious',
          'ScaldingPass',
          'SinqLaison',
          'Solitude',
          'Stain',
          'Syndicate',
          'Tash-Murkon',
          'Tenal',
          'Tenerifis',
          'TheBleakLands',
          'TheCitadel',
          'TheForge',
          'TheKalevalaExpanse',
          'TheSpire',
          'Tribute',
          'ValeoftheSilent',
          'Venal',
          'VergeVendor',
          'WickedCreek'
        ]
      }
    }
  }
</script>

<style scoped>

</style>
