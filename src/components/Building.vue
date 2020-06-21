<template>
  <g :class='["building", "planet-fill", planet]'>
    <Mine v-if="mine" />
    <PlanetaryInstitute v-else-if="planetaryInstitute" />
    <polygon v-else-if="gaiaFormer" :points='hexCorners' />
    <ResearchLab v-else-if="lab" />
    <Academy v-else-if="academy" />
    <TradingStation v-else-if="tradingStation" />
    <Token v-else-if="spaceStation" :faction="faction" :scale="0.3" />
  </g>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { factions, Faction, Building as BuildingEnum, Planet } from '@gaia-project/engine';
import { corners } from '../graphics/hex';
import Academy from './Buildings/Academy.vue';
import Mine from './Buildings/Mine.vue';
import PlanetaryInstitute from './Buildings/PlanetaryInstitute.vue';
import ResearchLab from './Buildings/ResearchLab.vue';
import Token from './Token.vue';
import TradingStation from './Buildings/TradingStation.vue';

@Component({
  components: {
    Academy,
    Mine,
    PlanetaryInstitute,
    ResearchLab,
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

  get hexCorners () {
    return corners().map(({ x, y }) => `${x * 0.4},${y * 0.4}`).join(" ");
  }

  get triangleCorners () {
    return [{ x: -0.5, y: Math.sqrt(3) / 4 }, { x: 0.5, y: Math.sqrt(3) / 4 }, { x: 0, y: -Math.sqrt(3) / 4 }].map(({ x, y }) => `${x * 0.5},${y * 0.5}`).join(" ");
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
