<template>
  <svg :class='["techTile", {highlighted, covered}]' v-show="this.count" v-b-tooltip :title="tooltip" @click="onClick" width="60" height="60" viewBox="-32 -32 64 64">
    <rect x=-30 y=-30 width=60 height=60 rx=3 ry=3 stroke="black" stroke-width=2 :fill="isAdvanced ? '#515FF8' : '#323232'" />
    <!--<text class="title" x="-25" y="-18">{{title}}</text>-->
    <text :class="['content', {smaller: content.length >= 10}]" x="-25" y="0" v-if="showText">{{content}}</text>
    <Condition :condition=condition />
    <SpecialAction v-if="isAction" :action="content.split('=>')[1].trim()" y=-25 width=50 height=50 x=-25 />
    <Resource v-if="cornerReward" :count=cornerReward.count :kind=cornerReward.type transform="translate(29, -29), scale(1.5)" />
    <Resource v-for="(res, i) in centerRewards" :count=res.count :kind=res.type :key=i :transform="`translate(${centerRewards.length > 1 ? (i - 0.5) * 25 : 0 }, 0) scale(1.5)`" />
    <Resource v-for="(res, i) in rightRewards" :count=res.count :kind=res.type :key="'right-'+i" :transform="`translate(13, ${rightRewards.length > 1 ? (i - 0.5) * 28 : 0 }) scale(1.5)`" />
    <text style="font-size: 40px; stroke: black; fill: white; dominant-baseline: central; text-anchor: middle" x="-14" v-if="event.operator === '+'">+</text>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { tiles, PlayerEnum, Event, TechTilePos, AdvTechTilePos, Operator, Condition as ConditionEnum } from '@gaia-project/engine';
import { eventDesc } from '../data/event';
import Resource from './Resource.vue';
import SpecialAction from './SpecialAction.vue';
import Condition from './Condition.vue';

@Component({
  components: {
    Condition,
    Resource,
    SpecialAction
  }
})
export default class TechTile extends Vue {
  @Prop()
  pos: TechTilePos | AdvTechTilePos;

  @Prop()
  player: PlayerEnum;

  @Prop()
  covered: boolean;

  onClick () {
    if (this.highlighted) {
      this.$store.dispatch("gaiaViewer/techClick", this.pos);
    }
  }

  get highlighted () {
    return this.$store.state.gaiaViewer.context.highlighted.techs.has(this.pos);
  }

  get tileObject () {
    return this.$store.state.gaiaViewer.data.tiles.techs[this.pos];
  }

  get tile () {
    return this.tileObject.tile;
  }

  get event () {
    return new Event(this.rawContent);
  }

  get cornerReward () {
    if (this.event.operator === Operator.Trigger || this.event.operator === Operator.Pass || (this.event.operator === Operator.Once && this.event.condition !== ConditionEnum.None)) {
      return this.event.rewards[0];
    }

    return null;
  }

  get centerRewards () {
    if (this.event.operator === Operator.Once && this.event.condition === ConditionEnum.None) {
      return this.event.rewards;
    }

    return [];
  }

  get condition () {
    return this.event.condition;
  }

  get rightRewards () {
    if (this.event.operator === Operator.Income) {
      return this.event.rewards;
    }

    return [];
  }

  get showText () {
    if (this.event.operator === Operator.Activate || this.event.operator === Operator.Income) {
      return false;
    }

    if (this.event.operator === Operator.Once) {
      if (this.event.condition === ConditionEnum.None || this.event.condition === ConditionEnum.Federation) {
        return false;
      }
    }

    return true;
  }

  get isAction () {
    return this.event.operator === Operator.Activate;
  }

  get rewards () {
    return this.event.rewards;
  }

  get count () {
    if (this.player !== undefined) {
      return 1;
    }
    return this.tileObject.count;
  }

  get rawContent () {
    return tiles.techs[this.tile][0];
  }

  get content () {
    const val = this.rawContent;

    return val.length > 10 && val[0] !== '=' ? val.replace(/ /g, '') : val;
  }

  get title () {
    // Only show count if there are more players than tech tiles available
    if (this.count > 1 && this.$store.state.gaiaViewer.data.players.length > 4) {
      return `${this.pos} (${this.count})`;
    }

    return this.pos;
  }

  get isAdvanced () {
    return this.pos.startsWith("adv-");
  }

  get tooltip () {
    return eventDesc(this.event);
  }
}

</script>

<style lang="scss">

svg {
  &.techTile {
    overflow: visible;
    .title {
      font-size: 10px;
      font-weight: bold;
      pointer-events: none;
      fill: white;
    }
    .content {
      font-size: 11px;
      pointer-events: none;
      fill: white;

      &.smaller {
        font-size: 9px;
      }
    }

    &.highlighted polygon {
      stroke: #2C4;
      cursor: pointer;
    }

    &.covered {
      stroke-opacity: 0.5;
      fill-opacity: 0.7;
    }
  }
}

</style>
