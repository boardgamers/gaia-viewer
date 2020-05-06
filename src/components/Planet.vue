<template>
  <g>
    <image :width=2*radius :height=2*radius :x=-radius :y=-radius :xlink:href="`/images/planets/${fill}.svg`" />
  </g>
</template>

<script lang="ts">
import Vue from 'vue';
import planets from "../data/planets";
import { Component, Prop } from 'vue-property-decorator';
import { Planet as PlanetEnum, factions, Faction, planetNames } from '@gaia-project/engine';

@Component
export default class Planet extends Vue {
  @Prop()
  planet: PlanetEnum;
  @Prop()
  faction: Faction;

  get radius() {
    return planets[this.planet].radius;
  }

  get fill() {
    if (this.faction && !this.$store.state.gaiaViewer.preferences?.noFactionFill) {
      return planetNames[factions.planet(this.faction)];
    }
    return planetNames[this.planet];
  }
}

</script>

<style lang="scss">

@import '../stylesheets/planets.scss';

svg {
  .planet {
    stroke-width: 0.04;
    fill: none;
    pointer-events: none;

    // terra
    &.r {stroke: $terra }
    // desert
    &.d {stroke: $desert}
    // swamp
    &.s {stroke: $swamp}
    // oxide
    &.o {stroke: $oxide}
    // titanium
    &.t {stroke: $titanium}
    // ice
    &.i {stroke: $ice}
    // volcanic
    &.v {stroke: $volcanic}
    // gaia
    &.g {stroke: $gaia}
    // transdim
    &.m {stroke: $transdim}
    // lost planet
    &.l {stroke: $lost}
  }

  .planet-fill, .planet-stroke {
    .no-faction-fill &.faction-fill {
      display: none;
    }

    // terra
    &.r {fill: $terra }
    // desert
    &.d {fill: $desert}
    // swamp
    &.s {fill: $swamp}
    // oxide
    &.o {fill: $oxide}
    // titanium
    &.t {fill: $titanium}
    // ice
    &.i {fill: $ice}
    // volcanic
    &.v {fill: $volcanic}
    // gaia
    &.g {fill: $gaia}
    // transdim
    &.m {fill: $transdim}
    // lost planet
    &.l {fill: $lost}
  }

  .planet-image {
    background-image: url("/images/planets/d.svg");
  }
}

</style>