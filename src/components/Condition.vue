<template>
  <g class="condition">
    <Building v-if="isBuilding" :building="condition" outline  transform="translate(0, 0) scale(20)" />
    <Federation v-else-if="condition === 'fed'" width=20 x=-10 y=-25 :used=true />
    <PlanetType v-else-if="condition === 'pt'"  transform=scale(1.1) filter=url(#outline-1) />
    <Sector v-else-if="condition === 's'" transform=scale(1.5) />
    <Planet v-else-if="condition === 'g'" planet="g" transform=scale(13) />
  </g>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Condition as ConditionEnum, Building as BuildingEnum } from "@gaia-project/engine";
import Building from './Building.vue';
import Federation from './FederationTile.vue';
import Planet from './Planet.vue';
import PlanetType from './Conditions/PlanetType.vue';
import Sector from './Conditions/Sector.vue';

@Component({
  components: {
    Building,
    Federation,
    Planet,
    PlanetType,
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
