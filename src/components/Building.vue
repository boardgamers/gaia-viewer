<template>
  <g :class='["building"]' :style="faction ? `filter: url(#color-${faction})` : ''">
    <component :is="buildingComponent" :filter="outline ? 'url(#outline)' : ''" />
  </g>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Faction, Building as BuildingEnum } from '@gaia-project/engine';
import Academy from './Buildings/Academy.vue';
import GaiaFormer from './Buildings/GaiaFormer.vue';
import Mine from './Buildings/Mine.vue';
import PlanetaryInstitute from './Buildings/PlanetaryInstitute.vue';
import ResearchLab from './Buildings/ResearchLab.vue';
import SpaceStation from './Buildings/SpaceStation.vue';
import TradingStation from './Buildings/TradingStation.vue';

const components = {
  [BuildingEnum.Mine]: "Mine",
  [BuildingEnum.TradingStation]: "TradingStation",
  [BuildingEnum.GaiaFormer]: "GaiaFormer",
  [BuildingEnum.SpaceStation]: "SpaceStation",
  [BuildingEnum.Academy1]: "Academy",
  [BuildingEnum.Academy2]: "Academy",
  [BuildingEnum.PlanetaryInstitute]: "PlanetaryInstitute",
  [BuildingEnum.ResearchLab]: "ResearchLab"
};

@Component({
  components: {
    Academy,
    GaiaFormer,
    Mine,
    PlanetaryInstitute,
    ResearchLab,
    SpaceStation,
    TradingStation
  }
})
export default class Building extends Vue {
  @Prop()
  faction: Faction;

  @Prop()
  building: BuildingEnum;

  @Prop({ default: false, type: Boolean })
  outline: boolean;

  get buildingComponent () {
    return components[this.building];
  }
}

</script>

<style lang="scss">

svg {
  .building {
    stroke-width: 0.1;
    pointer-events: none;
    stroke: #111;

    & > * {
      transform: scale(0.01);
    }
  }

  .additionalMine {
    stroke-width: 0.05;
  }
}

</style>
