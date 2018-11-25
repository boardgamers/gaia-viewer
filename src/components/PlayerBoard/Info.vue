<template>
  <g>
    <rect x=-0.5 y=-0.5 width=38 height=8 rx=0.1 ry=0.1 fill="#ffffff37" stroke=black stroke-width=0.07 />
    <g transform="translate(0, 0.5)">
      <text class="board-text">
        <tspan @click="$emit('playerClick')" :class="['player-name', {dropped: player.dropped}]" role="button">{{name}}</tspan>
        <tspan> - </tspan>
        <tspan class="faction-name" v-b-modal="factionName" role="button">{{factionName}}</tspan>
      </text>
      <text class="board-text" x=21>
        TF: {{3 - data.terraformCostDiscount}}
      </text>
      <text class="board-text" x=26>
        NAV: {{data.range}}
      </text>
      <text class="board-text" x=32>
        VP: {{data.victoryPoints}}
      </text>
    </g>
    <!-- Resources / Income -->
    <g transform="translate(0, 3)">
      <g>
        <text class="board-text">R</text>
        <g transform="translate(2.2, 0)">
          <Resource kind="c" :count="data.credits" transform="scale(0.08)"/>
          <text :class="['board-text', {maxResource: data.ores >= 30}]" transform="translate(0.7,0) scale(0.7)">/30</text>
        </g>
        <g transform="translate(5.5, 0)">
          <Resource kind="o" :count="data.ores" transform="scale(0.08)"/>
          <text :class="['board-text', {maxResource: data.ores >= 15}]" transform="translate(0.7,0) scale(0.7)">/15</text>
        </g>
        <g transform="translate(9, 0)">
          <Resource kind="k" :count="data.knowledge" transform="scale(0.08)"/>
          <text :class="['board-text', {maxResource: data.knowledge >= 15}]" transform="translate(0.7,0) scale(0.7)">/15</text>
        </g>
        <Resource kind="q" :count="data.qics" transform="translate(12.5,0) scale(0.08)"/>
      </g>
      <g transform="translate(0, 1.5)">
        <text class="board-text" x=0.25>I</text>
      </g>
    </g>
  </g>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Building from '../Building.vue';
import Resource from '../Resource.vue';
import {Building as BuildingEnum, Faction, Reward, FactionBoard, factionBoard, Operator, Resource as ResourceEnum, factions, PlayerData, Player} from '@gaia-project/engine';

@Component({
  components: {
    Building,
    Resource
  },
  watch: {
    faction(newVal) {
      this.board = factionBoard(newVal);
    }
  }
})
export default class BuildingGroup extends Vue {
  @Prop()
  faction: Faction;
  @Prop()
  data: PlayerData;
  @Prop()
  player: Player;

  get factionName(): string {
    return factions[this.faction].name;
  }

  get name() {
    if (this.player.name) {
      return this.player.name;
    }
    return "Player " + (this.player.player + 1);
  }
}

</script>
<style lang="scss">
  .maxResource {
    fill: red;
  }
</style>
