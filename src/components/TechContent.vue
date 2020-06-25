<template>
  <g>
    <text :class="['content', {smaller: content.length >= 10}]" x="-25" y="0" v-if="showText">{{content}}</text>
    <SpecialAction v-if="isAction" :action="['>' + content.split('=>')[1].trim()]" y=-20 width=40 height=40 x=-20 />
    <Resource v-if="cornerReward" :count=cornerReward.count :kind=cornerReward.type transform="translate(19.5, -19.5), scale(1.35)" />
    <Condition :condition=condition :transform="`translate(${event.operator==='>>' && condition !== 'a' ?8:0}, ${event.operator==='>>' ? 5 + (condition === 'a' ? 3 : 0) : (event.operator === '|' ? 7 : 0)}) scale(1.5)`" />
    <Resource v-for="(res, i) in centerRewards" :count=res.count :kind=res.type :key=i :transform="`translate(${centerRewards.length > 1 ? (i - 0.5) * 26 : 0 }, 0) scale(${centerRewards.length === 1 ? 2 : 1.5})`" />
    <Resource v-for="(res, i) in rightRewards" :count=res.count :kind=res.type :key="'right-'+i" :transform="`translate(13, ${rightRewards.length > 1 ? (i - 0.5) * 28 : 0 }) scale(1.5)`" />
    <template v-if="event.operator === '|'">
      <polygon points="-7.5,3 -3,7.5 3,7.5 7.5,3 7.5,-3 3,-7.5 -3,-7.5 -7.5,-3" fill="#F8031D" transform="translate(-17,-17) scale(1.3)" stroke=black stroke-width=1.5 />
    </template>
    <template v-else-if="event.operator === 'PA->4pw'">
      <Building building="PI" transform="translate(-14, -8) scale(2.7) " outline />
      <Building building="ac1" transform="translate(14, -8) scale(2.7)" outline />
      <Resource kind="t" transform="translate(-20, 18) scale(0.8)" />
      <Resource kind="t" transform="translate(-6.66, 18) scale(0.8)" />
      <Resource kind="t" transform="translate(6.66, 18) scale(0.8)" />
      <Resource kind="t" transform="translate(20, 18) scale(0.8)" />
    </template>
    <template v-else-if="event.operator==='>>'">
      <Operator :operator=event.operator :condition=event.condition transform="translate(2,10) scale(1.2)" />
    </template>
    <text style="font-size: 40px; stroke: black; fill: white; dominant-baseline: central; text-anchor: middle; stroke-width: 2px; font-weight: bold;" x="-14" v-if="event.operator === '+'">+</text>
  </g>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { tiles, PlayerEnum, Event, TechTilePos, AdvTechTilePos, Operator as OperatorEnum, Condition as ConditionEnum, Building as BuildingEnum } from '@gaia-project/engine';
import { eventDesc } from '../data/event';
import Resource from './Resource.vue';
import Building from './Building.vue';
import Condition from './Condition.vue';
import Operator from './Operator.vue';
import SpecialAction from './SpecialAction.vue';

@Component({
  components: {
    Building,
    Condition,
    Operator,
    Resource,
    SpecialAction
  }
})
export default class TechContent extends Vue {
  @Prop()
  content!: string;

  get event () {
    return new Event(this.content);
  }

  get cornerReward () {
    if (this.event.operator === OperatorEnum.Trigger || this.event.operator === OperatorEnum.Pass || (this.event.operator === OperatorEnum.Once && this.event.condition !== ConditionEnum.None)) {
      return this.event.rewards[0];
    }

    return null;
  }

  get centerRewards () {
    if (this.event.operator === OperatorEnum.Once && this.event.condition === ConditionEnum.None) {
      return this.event.rewards;
    }

    return [];
  }

  get condition () {
    return this.event.condition;
  }

  get rightRewards () {
    if (this.event.operator === OperatorEnum.Income) {
      return this.event.rewards;
    }

    return [];
  }

  get showText () {
    if (this.event.operator === OperatorEnum.Activate || this.event.operator === OperatorEnum.Income || this.event.operator === OperatorEnum.Special) {
      return false;
    }

    if (this.event.operator === OperatorEnum.Once || this.event.operator === OperatorEnum.Trigger || this.event.operator === OperatorEnum.Pass) {
      // console.log(this.event, this.event.condition);
      if ([ConditionEnum.None, ConditionEnum.Federation, ConditionEnum.PlanetaryInstituteOrAcademy, ConditionEnum.AdvanceResearch, ConditionEnum.MineOnGaia, ConditionEnum.PlanetType, ConditionEnum.Sector, ConditionEnum.Gaia, ...Object.values(BuildingEnum)].includes(this.event.condition as any)) {
        return false;
      }
    }

    return true;
  }

  get isAction () {
    return this.event.operator === OperatorEnum.Activate;
  }

  get rewards () {
    return this.event.rewards;
  }
}

</script>
