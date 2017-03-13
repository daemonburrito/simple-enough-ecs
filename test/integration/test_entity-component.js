// Tests of entity-component integration
import assert from 'assert';
import * as Simple from '../../src/Simple';


const PLAYER_COMPONENT_BUNDLE = [
  'name', 'position', 'movement', 'input'
];


describe('entity-component', () => {

  const world = new Simple.World();
  world.ComponentManager = new Simple.ComponentManager();
  world.EntityManager = new Simple.EntityManager();


  describe('component registration', () => {
    it('associates components and entities', () => {
      // Register some components
      world.components.register(...PLAYER_COMPONENT_BUNDLE);

      // Create a player entity, get an ID
      let player = world.entities.create();

      // Attach "instances" of the components to the ID with the EntityManager
      // of this World and initialize values.
      world.entities.attachComponents(player, {
        name: 'player',
        position: [0,0,0],
        movement: true,
        input: true
      });

      // Create the componentsKey
      const cKey = world.components.createComponentKey(
        ...PLAYER_COMPONENT_BUNDLE);

      // Push the player ID into a list associated with a key created from the
      // components boolean existence.
      world.entities.register(
        player, cKey
      );

      assert.strictEqual(world.entities.componentEntityMap.size, 1,
        'The CEMap (componentKey->[ids]) has a record');

      let results = world.entities.query(cKey);
      //console.log(world, cKey);
      assert.strictEqual(results.length, 1,
        'One match for the generated componentKey');
    });
  });
});