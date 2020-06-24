<template>
  <g :class='["boardAction", kind, {highlighted, faded}]' v-b-tooltip :title="tooltip">
    <polygon points="-1,0.5 -0.5,1 0.5,1 1,0.5 1,-0.5 0.5,-1 -0.5,-1 -1,-0.5" :transform="`scale(${scale})`" @click="onClick" />
    <text :transform="`scale(${scale/17})`">
      <tspan :x="i+1 < income.length ? 1 : 0" v-for="(line, i) in income" :key="i" :dy="`${i*1.15 - (income.length - 1) / 4}em`">
        {{line.replace(/ /g, '')}}
      </tspan>
    </text>
    <Resource v-for="(reward, i) in rewards" :key=i :kind=reward.type :count=reward.count :transform="`translate(0, ${(i - (rewards.length - 1)/2) * 14}) scale(${scale/(rewards.length === 1 ? 13 : 17)})`" />
    <g transform=translate(15,-15)>
      <circle r="8" stroke="black" stroke-width="1" fill="white" transform=scale(0.8) v-if="costNumber>1" />
      <text x="-3" y="3.5" v-if="costNumber>1" fill="black">
          {{costNumber}}
      </text>
    </g>
  </g>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { tiles, Event, BoardAction as BoardActionEnum, boardActions, Reward } from '@gaia-project/engine';
import { eventDesc } from '../data/event';
import Resource from './Resource.vue';

@Component<BoardAction>({
  components: {
    Resource
  }
})
export default class BoardAction extends Vue {
  @Prop()
  scale: number;

  @Prop()
  action: BoardActionEnum;

  onClick () {
    if (!this.highlighted) {
      return;
    }
    this.$store.dispatch("gaiaViewer/actionClick", this.action);
  }

  get highlighted () {
    return this.$store.state.gaiaViewer.context.highlighted.actions.has(this.action);
  }

  get tooltip () {
    const costDesc = "Spend " + this.cost + "\n";

    return costDesc + boardActions[this.action].income.map(x => eventDesc(new Event(x))).join('\n');
  }

  get faded () {
    return !this.$store.state.gaiaViewer.data.boardActions[this.action];
  }

  get kind () {
    return this.action[0] === 'p' ? 'power' : 'qic';
  }

  get rewards () {
    return boardActions[this.action].income.map(x => new Reward(x));
  }

  get income () {
    return [].concat(...boardActions[this.action].income.map(x => {
      if (x.includes('+')) {
        return [x.slice(0, x.indexOf('+')), x.slice(x.indexOf('+'))];
      }
      return x.split('-');
    }));
  }

  get cost () {
    return boardActions[this.action].cost;
  }

  get costNumber () {
    return new Reward(this.cost).count;
  }
}

</script>

<style lang="scss">

g {
  &.boardAction {
    & > polygon {
      stroke: #333;
      stroke-width: 0.02;
    }

    &.qic {
      & > polygon {
        fill: green;
      }
    }

    &.power {
      & > polygon {
        fill: purple;
      }
    }

    & > text {
      fill: white;
      text-anchor: middle;
      dominant-baseline: middle;
      font-size: 12px;
      pointer-events: none;
    }

    &.highlighted > polygon {
      stroke: #2C4;
      cursor: pointer;
      stroke-width: 0.08;
    }

    &.faded {
      stroke-opacity: 0.5;
      fill-opacity: 0.5;
    }
  }
}

</style>
