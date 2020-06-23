<template>
  <g class="condition">
    <Building v-if="isBuilding" :building="condition" :outline=true  transform="translate(0, 0) scale(20)" />
  </g>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Condition as ConditionEnum, Building as BuildingEnum } from "@gaia-project/engine";
import Building from './Building.vue';

@Component({
  components: {
    Building
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
