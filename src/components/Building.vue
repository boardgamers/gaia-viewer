<template>
  <g :class='["building", "planet-fill", planet]'>
    <Mine v-if="mine" transform="scale(0.1)" />
    <PlanetaryInstitute v-else-if="planetaryInstitute" transform="scale(0.1)" />
    <GaiaFormer v-else-if="gaiaFormer" transform="scale(0.1)" />
    <ResearchLab v-else-if="lab" transform="scale(0.1)" />
    <Academy v-else-if="academy" transform="scale(0.1)" />
    <TradingStation v-else-if="tradingStation" transform="scale(0.1)" />
    <SpaceStation v-else-if="spaceStation" :faction="faction" transform="scale(0.1)" />
  </g>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { factions, Faction, Building as BuildingEnum, Planet } from '@gaia-project/engine';
import { corners } from '../graphics/hex';
import Academy from './Buildings/Academy.vue';
import GaiaFormer from './Buildings/GaiaFormer.vue';
import Mine from './Buildings/Mine.vue';
import PlanetaryInstitute from './Buildings/PlanetaryInstitute.vue';
import ResearchLab from './Buildings/ResearchLab.vue';
import SpaceStation from './Buildings/SpaceStation.vue';
import Token from './Token.vue';
import TradingStation from './Buildings/TradingStation.vue';

@Component({
  components: {
    Academy,
    GaiaFormer,
    Mine,
    PlanetaryInstitute,
    ResearchLab,
    SpaceStation,
    Token,
    TradingStation
  }
})
export default class Building extends Vue {
  @Prop()
  faction: Faction;

  @Prop()
  building: BuildingEnum;

  get planet () {
    return (this.faction as any === "wild") ? Planet.Transdim : factions.planet(this.faction);
  }

  get mine () { return this.building === BuildingEnum.Mine; }
  get tradingStation () { return this.building === BuildingEnum.TradingStation; }
  get planetaryInstitute () { return this.building === BuildingEnum.PlanetaryInstitute; }
  get lab () { return this.building === BuildingEnum.ResearchLab; }
  get academy () { return this.building === BuildingEnum.Academy1 || this.building === BuildingEnum.Academy2; }
  get gaiaFormer () { return this.building === BuildingEnum.GaiaFormer; }
  get spaceStation () { return this.building === BuildingEnum.SpaceStation; }
}

</script>

<style lang="scss">

svg {
  .building {
    stroke-width: 0.1;
    pointer-events: none;
    stroke: #111;
  }

  .additionalMine {
    stroke-width: 0.05;
  }
}

</style>
