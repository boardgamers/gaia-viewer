<template>
  <g :transform="`translate(${x}, 0)`">
    <ResearchTile y="290" :level="0" :field="field" />
    <ResearchTile y="250" :level="1" :field="field" />
    <ResearchTile y="210" :level="2" :field="field" />
    <ResearchTile y="153" :level="3" :field="field" />
    <ResearchTile y="113" :level="4" :field="field" />
    <ResearchTile y="0" :level="5" :field="field" />
    <g v-if="$store.state.gaiaViewer.data.tiles && $store.state.gaiaViewer.data.tiles.techs['gaia']">
      <TechTile :pos="'adv-'+field" y="51.5" x="1" />
      <TechTile :pos="field" y="341" x="1" />
    </g>
  </g>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ResearchField } from '@gaia-project/engine';
import ResearchTile from './ResearchTile.vue';
import TechTile from './TechTile.vue';

@Component({
  components: {
    ResearchTile,
    TechTile
  }
})
export default class ResearchTrack extends Vue {
  @Prop()
  field: ResearchField;

  @Prop()
  x: number;
}
</script>

<style lang="scss" scoped>

</style>
