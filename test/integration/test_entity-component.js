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
      world.components.register(...PLAYER_COMPONENT_BUNDLE);

      let player = world.entities.create();
      world.entities.attachComponents(player, {
        name: 'player',
        position: [0,0,0],
        movement: true,
        input: true
      });

      world.entities.register(
        player,
        world.components.createComponentKey(player, ...PLAYER_COMPONENT_BUNDLE)
      );

      console.log('world: ', world);

      console.log('entityManager ce-map: ',
        world.entities.componentEntityMap);
      assert.strictEqual(world.entities.componentEntityMap.size, 1);
    });
  });
});