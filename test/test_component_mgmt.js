import assert from 'assert';
import * as Simple from '../src/Simple';

describe('components', () => {
  describe('ComponentTemplateRegistry', () => {
    let registry = new Simple.ComponentTemplateRegistry();

    it('stores component templates', () => {
      registry.add({
        name: 'test component',
        value_1: 1,
        value_2: 2
      });
    });

    it('rejects unnamed components', () => {
      assert.throws(() => {
        registry.add({
          value_1: 1
        });
      }, /.*required.$/);
    });
  });
});