import * as Simple from './lib/simple.es.js';
import * as three from 'three';

import Camera from './camera';
import Viewport from './viewport';
import Game from './game';


// Set up Simple.World
const worldSetup = () => {
  const world = new Simple.World();
  world.ComponentManager = new Simple.ComponentManager();
  world.EntityManager = new Simple.EntityManager();
  world.SystemManager = new Simple.SystemManager();

  return world;
};


// onload bootstrap
const init = () => {
  const viewport = new Viewport(),
    scene = new three.Scene(),
    camera = new Camera(),
    world = worldSetup();

  viewport.setup();
  camera.setup();

  const game = new Game(world);
  game.setup();

  let playerSprite = new three.Sprite(),
    mobSprite = new three.Sprite();

  world.entities.attachComponents(
    game.instances.player, {
      sprite: playerSprite
    }
  );

  world.entities.attachComponents(
    game.instances.mob, {
      sprite: mobSprite
    }
  );

  scene.add(playerSprite);
  scene.add(mobSprite);

  // Get a Loop and run `world.go()`.
  const loopFactory = new Simple.LoopFactory(
    Simple.extrapolated_loop,
    world.update.bind(world),
    (lagOffset) => {
      camera.camera.lookAt(scene.position);

      viewport.renderer.render(scene, camera.camera);
    },
    world
  );
  let frame = loopFactory.build();

  let reqId = world.go(frame);

  setTimeout(() => {
    world.stop(frame, reqId);
  }, 10000);
};

window.onload = init;
