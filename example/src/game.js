import * as Simple from './lib/simple.es.js';

import {
  MovementSystem,
  SpritePositionSystem,
  KeyboardInputSystem
} from './systems';

export default class Game {
  // Container for instance data
  constructor(world) {
    this.world = world;
  }

  setup() {
    let cameraEntity = this.world.entities.create(),
      player = this.world.entities.create(),
      mob = this.world.entities.create();


    this.world.entities.attachComponents(cameraEntity, {
      name: 'camera',
      position: new Float32Array([150,0,0]),
      targetPosition: [0,0,0],
      speed: 0,
      rotation: 0
    });

    this.world.entities.attachComponents(player, {
      name: 'player',
      position: new Float32Array([-10,-10, 1]),
      direction: 90,
      speed: .1
    });

    this.world.entities.attachComponents(mob, {
      name: 'mob',
      position: new Float32Array([10,10, 1]),
      direction: 270,
      speed: .1
    });

    this.instances = {
      cameraEntity, player, mob
    }

    this._registerKeys();
    this._registerSystemQueues();
  }

  _registerKeys() {
    let invisibleTargetedComponentKey = this.world.components.createComponentKey([
      'name',
      'position',
      'targetPosition',
      'speed',
      'rotation'
    ]);

    this.world.entities.register(
      this.instances.cameraEntity, invisibleTargetedComponentKey
    );

    let componentKey = this.world.components.createComponentKey([
      'name',
      'position',
      'direction',
      'speed',
      'sprite',
      'material'
    ]);

    this.world.entities.register(
      this.instances.player,
      componentKey
    );

    this.world.entities.register(
      this.instances.mob,
      componentKey
    );
  }

  _registerSystemQueues() {
    let moveSystem = new MovementSystem(),
      spritePositionSystem = new SpritePositionSystem(),
      inputSystem = new KeyboardInputSystem();

    let moveQueue = new Simple.SystemQueue([moveSystem]),
      spriteQueue = new Simple.SystemQueue([spritePositionSystem]),
      inputQueue = new Simple.SystemQueue([inputSystem]);

    // Register a new system queue
    this.world.systems.register_queue(moveQueue,
      this.world.components.createComponentKey([
        'direction', 'speed', 'position'
      ]));

    this.world.systems.register_queue(spriteQueue,
      this.world.components.createComponentKey([
        'sprite', 'position'
      ]));

    this.world.systems.register_queue(inputQueue,
      this.world.components.createComponentKey([
        'direction', 'speed'
      ]));
  }
}
