<template>
  <svg viewBox="-25 -25 50 50" width="50" height="50">
    <g :class='["specialAction", {highlighted, disabled}]'>
      <polygon points="-10,4 -4,10 4,10 10,4 10,-4 4,-10 -4,-10 -10,-4" transform="scale(2.4)" @click="onClick" />
      <Resource v-for="(reward, i) in rewards" :key=i :count=reward.count :kind=reward.type :transform="`translate(${rewards.length > 1 ? (i - 0.5) * 20  : 0}, 0), scale(1.5)`" />
    </g>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { tiles, Event, Reward } from '@gaia-project/engine';
import { eventDesc } from '../data/event';
import Resource from './Resource.vue';

@Component({
  components: {
    Resource
  }
})
export default class SpecialAction extends Vue {
  @Prop({ default: false })
  disabled: boolean;

  @Prop()
  action: string;

  onClick () {
    if (!this.highlighted) {
      return;
    }
    this.$store.dispatch("gaiaViewer/actionClick", this.action);
  }

  get income () {
    return this.action.includes(',') ? this.action.split(',') : this.action.split('-');
  }

  get rewards () {
    console.log(Reward.parse(this.action), this.action);
    return Reward.parse(this.action);
  }

  get highlighted () {
    return this.$store.state.gaiaViewer.context.highlighted.actions.has(this.action);
  }
}

</script>

<style lang="scss">

g {
  &.specialAction {
    polygon {
      stroke: #333;
      stroke-width: 0.02;
      fill: orange;
    }

    &.highlighted polygon {
      stroke: #2C4;
      cursor: pointer;
      stroke-width: 0.04;
    }

    &.disabled {
      stroke-opacity: 0.6;
      fill-opacity: 0.3;

      text {
        fill: #000;
      }
    }
  }
}

</style>
