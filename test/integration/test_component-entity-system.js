import assert from 'assert';
// import * as Simple from '../../src/Simple';
import * as Simple from '../../lib/simple.es';

// Stub requestAnimationFrame for tests
import {replaceRaf} from 'raf-stub';
replaceRaf([global]);


describe('component-entity-system', () => {
  describe('system registration', () => {
    // Instantiate a world, set up all managers.
    const world = new Simple.World();
    world.ComponentManager = new Simple.ComponentManager();
    world.EntityManager = new Simple.EntityManager();
    world.SystemManager = new Simple.SystemManager();

    console.log(world.components);
    // Make a componentsKey with "name"
    let componentKey = world.components.createComponentKey(['name']);

    // Get the next available entity ID
    let player = world.entities.create();

    // Register the ID with the componentsKey
    world.entities.register(player, componentKey);

    // Attach a component value to the entity
    world.entities.attachComponents(player, {
      name: 'player'
    });

    // Make a new name system, which will run over every entity with a
    // componentKey that matches `['name']`
    class NameSystem extends Simple.System {
      count = 0;

      // The interface to implement: the controller (SystemManager in this
      // case) will call.
      update () {
        ++this.count;
      }
    }

    // Register the name system with the SystemManager.
    let nameSystem = new NameSystem(),
      queue = new Simple.SystemQueue([nameSystem]);

    // Register a new system queue
    world.systems.register_queue(queue, componentKey);

    const loopFactory = new Simple.LoopFactory(
      Simple.extrapolated_loop,
      world.update.bind(world),
      () => {}
    );
    let frame = loopFactory.build();

    it('Runs systems', () => {
      // Run the world for a few ticks.
      world.go(frame);

      let ticksLeft = 10;

      while (ticksLeft > 0) {
        requestAnimationFrame.step();
        --ticksLeft;
      }

      world.stop();

      // nameSystem should now have some saved state.
      assert(nameSystem.count > 0, 'Name system has changed some state.');
    });
  });


  describe('component updates', () => {
    const world = new Simple.World();
    world.ComponentManager = new Simple.ComponentManager();
    world.EntityManager = new Simple.EntityManager();
    world.SystemManager = new Simple.SystemManager();

    let componentKey = world.components.createComponentKey([
      'name', 'position', 'direction', 'velocity'
    ]);

    let player = world.entities.create();

    world.entities.register(player, componentKey);

    let mob = world.entities.create();

    world.entities.register(mob, componentKey);

    world.entities.attachComponents(player, {
      name: 'player',
      position: [-10,-10],
      direction: 90,
      speed: 1
    });

    world.entities.attachComponents(mob, {
      name: 'mob',
      position: [10,10],
      direction: 270,
      speed: 1
    });

    class MovementSystem extends Simple.System {
      update(entity, components) {
        console.log(entity, components);

        let dirRads = components[0].direction * Math.PI/180;

        let velX = Math.sin(dirRads) * components[0].speed;
        let velY = Math.cos(dirRads) * components[0].speed;

        components[0].position[0] += velX;
        components[0].position[1] += velY;
      }
    }

    // Register the name system with the SystemManager.
    let moveSystem = new MovementSystem(),
      queue = new Simple.SystemQueue([moveSystem]);

    // Register a new system queue
    world.systems.register_queue(queue, componentKey);

    const loopFactory = new Simple.LoopFactory(
      Simple.extrapolated_loop,
      world.update.bind(world),
      () => {}
    );
    let frame = loopFactory.build();

    it('Updates components', () => {
      // Run the world for a few ticks.
      world.go(frame);

      let ticksLeft = 10;

      while (ticksLeft > 0) {
        requestAnimationFrame.step();
        --ticksLeft;
      }

      world.stop();
    });
  });
});