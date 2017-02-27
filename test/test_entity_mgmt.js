import { strictEqual, ok } from 'assert';
import * as Simple from '../src/Simple';

const EXPECTED_LEN = 50;

describe('entity', () => {
  describe('Entity management fns', () => {
    let entities = Simple.create_entity_stack(EXPECTED_LEN);

    describe('entity.fn.create_entity_stack', () => {
      it('creates a stack of ids of a specified length', () => {
        strictEqual(entities.length, EXPECTED_LEN);
      });

      it('creates a stack of ids with a Uint32Array', () => {
        strictEqual(entities instanceof Uint32Array, true);
      });
    });
  });

  describe('EntityManager', () => {
    let manager = new Simple.EntityManager(
      Simple.create_entity_stack(EXPECTED_LEN)
    );

    it('contains a stack of ids', () => {
      ok(manager.entities);
    });
  });
});