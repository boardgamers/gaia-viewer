<template>
  <g class="condition">
    <Building v-if="isBuilding" :building="condition" :outline=false  transform="translate(0, 0) scale(30)" />
    <Federation v-else-if="condition === 'fed'" width=30 x=-15 y=-25 :used=true />
  </g>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Condition as ConditionEnum, Building as BuildingEnum } from "@gaia-project/engine";
import Building from './Building.vue';
import Federation from './FederationTile.vue';

@Component({
  components: {
    Building,
    Federation
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
