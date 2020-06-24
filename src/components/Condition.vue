<template>
  <g class="condition">
    <Building v-if="isBuilding" :building="condition" outline  transform="translate(0, 0) scale(22)" />
    <Federation v-else-if="condition === 'fed'" width=25 x=-12.5 y=-26 :used=true />
    <PlanetType v-else-if="condition === 'pt'"  transform=scale(1.1) filter=url(#outline-1) />
    <Sector v-else-if="condition === 's'" transform=scale(1.5) />
    <g v-else-if="condition === 'g'" filter=url(#outline-1) >
      <image xlink:href="../assets/conditions/planet.svg" width=25 x=-12 y=-11.5 filter="url(#color-planet-g)" transform="scale(-1,1)" />
    </g>
    <Resource v-else-if="condition === 'step'" kind="step" />
    <g v-else-if="condition === 'mg'" transform="translate(-2,0)">
      <image xlink:href="../assets/conditions/planet-flat.svg" width=30 x=-12 y=-11.5 filter="url(#color-planet-g)" transform="scale(-1,-1)" />
      <Building building="m" outline transform="translate(0, -5) scale(22)" />
    </g>
    <g v-else-if="condition === 'PA'">
      <Building building="PI" outline transform="translate(-8, 0) scale(18)" />
      <Building building="ac1" outline transform="translate(8, 0) scale(18)" />
    </g>
    <g v-else-if="condition === 'a'">
      <line x1="-15" x2="15" stroke ="#aaa" />
      <line x1="-15" x2="15" y1=-10 y2=-10 stroke ="#aaa" />
      <line x1="-15" x2="15" y1=10 y2=10 stroke ="#aaa" />
      <image xlink:href="../assets/operators/trigger.svg" width=15 :transform="`rotate(180), translate(6, -8), scale(0.7)`" />
      <!-- <text y=-1 style="font-size: 9px">3</text>
      <text y=8.5 style="font-size: 9px">2</text>-->
    </g>
  </g>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Condition as ConditionEnum, Building as BuildingEnum } from "@gaia-project/engine";
import Building from './Building.vue';
import Federation from './FederationTile.vue';
import Planet from './Planet.vue';
import PlanetType from './Conditions/PlanetType.vue';
import Resource from './Resource.vue';
import Sector from './Conditions/Sector.vue';

@Component({
  components: {
    Building,
    Federation,
    Planet,
    PlanetType,
    Resource,
    Sector
  }
})
export default class Condition extends Vue {
  @Prop()
  condition!: ConditionEnum;

  get isBuilding () {
    return Object.values(BuildingEnum).includes(this.condition as any);
  }
}

</script>
<style lang="scss">

.condition {

}

</style>
