import assert from 'assert';
import * as Simple from '../../src/Simple';

describe('Component-System', () => {
  describe('world components', () => {
    const world = new Simple.World();
    world.ComponentManager = new Simple.ComponentManager();

    it('holds ComponentManagers', () => {
      assert.notStrictEqual(world.components, undefined);
    });

    world.components.register('name', 'position', 'movement', 'input');

    it('can create keys from component lists', () => {
      let enabled = ['name', 'position', 'movement'],
        id = 1;

      let key = world.components.createComponentKey(id, ...enabled);

      assert.strictEqual(key[world.components.indexOf('input')], 0)
    });
  });
});