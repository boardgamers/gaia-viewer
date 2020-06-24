import launch from './launcher';
import Engine from '@gaia-project/engine';

import Wrapper from './components/Wrapper.vue';
import Game from './components/Game.vue';

function launchSelfContained (selector = "#app", debug = true) {
  const emitter = launch(selector, debug ? Wrapper : Game);

  let engine = new Engine(["init 3 randomSeed","p1 faction lantids","p2 faction geodens","p3 faction xenos","lantids build m 4A2","geodens build m 4B5","xenos build m 1A3","xenos build m 5A8","geodens build m 5A7","lantids build m 10A8","xenos build m 10B3","xenos booster booster1","geodens booster booster2","lantids booster booster3","lantids build ts 4A2.","geodens build ts 5A7.","xenos charge 1pw","xenos build ts 5A8.","geodens charge 2pw"], {});
  engine.generateAvailableCommandsIfNeeded();

  const unsub = emitter.store.subscribeAction(({ payload, type }) => {
    if (type === "gaiaViewer/loadFromJSON") {
      const egData: Engine = payload;
      engine = new Engine(egData.moveHistory, egData.options);
      engine.generateAvailableCommandsIfNeeded();
      emitter.emit("state", JSON.parse(JSON.stringify(engine)));
    }
  });
  emitter.app.$once("hook:beforeDestroy", unsub);

  emitter.on("move", (move: string) => {
    console.log("executing move", move);
    const copy = Engine.fromData(JSON.parse(JSON.stringify(engine)));

    if (move) {
      copy.move(move);
      copy.generateAvailableCommandsIfNeeded();

      // Only save updated version if a full turn was done
      if (copy.newTurn) {
        engine = copy;
      }
    }

    emitter.emit("state", JSON.parse(JSON.stringify(copy)));
  });

  emitter.emit("state", JSON.parse(JSON.stringify(engine)));
}

export default launchSelfContained;
