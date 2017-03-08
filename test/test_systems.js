import assert from 'assert';
import * as Simple from '../src/Simple';

describe('Systems', () => {
  describe('Query engine', () => {
    let manager = new Simple.SystemManager();

    it('translates to fastQueries', () => {
      let fastQuery = manager.translateQuery({
        position: true
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