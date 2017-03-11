import assert from 'assert';
import * as Simple from '../../src/Simple';


describe('component-entity-system', () => {
  describe('system registration', () => {
    // Instantiate a world, set up all managers.
    const world = new Simple.World();
    world.ComponentManager = new Simple.ComponentManager();
    world.EntityManager = new Simple.EntityManager();
    world.SystemManager = new Simple.SystemManager();

    // Make a componentsKey with "name"
    let componentKey = Simple.World.components
      .createComponentKey(['name']);

    // Get the next available entity ID
    let player = world.entities.create();

    // Register the ID with the componentsKey
    world.components.register(player, componentKey);

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
      update (entity, components) {
        // Keep some state; log the name component once every 60 ticks.
        if (this.count % 60 === 0) {
          console.log('NameSystem Called!', entity, components.name);
          return components;
        }
      }
    }

    // Register the name system with the SystemManager.
    let nameSystem = new NameSystem();
    world.systems.register(nameSystem, componentKey);

    it('Runs systems', () => {
      // Run the world for 5 seconds.
      world.go(Simple.extrapolated_loop);
      let stid = setTimeout(() => {
        world.stop();
      }, 5000);

      clearTimeout(stid);

      // nameSystem should now have some saved state.
      assert(nameSystem.count > 0);
    });
  });
});