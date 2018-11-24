<template>
  <g>
    <rect :x="0" y="-1.2" :width=width height=2.4 stroke=black stroke-width=0.07 fill=none rx=0.2 ry=0.2 />
    <g v-for="i in buildingList" :transform="`translate(${(i+0.5)*buildingSpacing+offset}, 0)`" :key=i>
      <circle stroke=black stroke-width=0.07 fill=white r=1  :key=i />
      <Building :building="building" :faction="faction" transform="scale(1.4)" v-if="i >= placed" />
    </g>
  </g>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Building from '../Building.vue';

@Component({
  components: {
    Building
  }
})
export default class BuildingGroup extends Vue {
  @Prop()
  nBuildings: number;
  @Prop()
  building: string;
  @Prop()
  faction: string;
  @Prop()
  placed: number;

  get buildingList() {
    return [0,1,2,3,4,5,6,7].slice(0, this.nBuildings);
  }

  get offset() {
    return 1.4;
  }

  get buildingSpacing() {
    return 2.2;
  }

  get paddingRight() {
    return 0.2;
  }

  get width() {
    return this.nBuildings * this.buildingSpacing + this.offset + this.paddingRight;
  }
}

</script>

<style lang="scss">

</style>