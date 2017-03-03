import assert from 'assert';
import * as Simple from '../src/Simple';

const EXPECTED_LEN = 50;

describe('entity', () => {
  describe('Entity management fns', () => {
    let entities = Simple.create_entity_stack(EXPECTED_LEN);

    describe('entity.fn.create_entity_stack', () => {
      it('creates a stack of ids of a specified length', () => {
        assert.strictEqual(entities.length, EXPECTED_LEN);
      });

      it('creates a stack of ids with a Uint32Array', () => {
        assert.strictEqual(entities instanceof Uint32Array, true);
      });
    });
  });

  describe('EntityManager', () => {
    let manager = new Simple.EntityManager(
      Simple.create_entity_stack(EXPECTED_LEN)
    );

    it('contains a stack of ids', () => {
      assert.ok(manager.entities);
    });

    it('contains its own unique stack', () => {
      let manager2 = new Simple.EntityManager(
        Simple.create_entity_stack(1)
      );
      assert.notEqual(manager.entities, manager2.entities);
      assert.strictEqual(manager2.entities.length, 1);
    });

    it('creates an entity and returns a wrapper object', () => {
      let new_entity = manager.createEntity();
      assert.strictEqual(new_entity.entity, manager.entities[0]);
    });
  });
});