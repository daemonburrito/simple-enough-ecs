// Component Manager
// Responsibilities:
// * Registering components
// * Defining how components are added to entity keys
//
// Components are expressed as 64-bit bitfields in a table with their related
// entities.
//
// Entity | Components
// 1      | 10010...0
// 2      | 01100...1
//
// 1s signify the presence of a component, 0s signify its absence. An entity
// with no 1s in its component bitfield is "deleted" (though it may remain to
// preserve contiguous regions of heap).
//
// Generally, entities have at least one component, and that component is a
// "tag" (ie, has no real value) with the entities "name", which can be any
// string identifier for debugging/serialization/etc.
//
// Components exist independent of any entities; ie, they are registered so
// that their place in the bitfield can be calculated, and this is done before
// the entity gets an ID from the stack.
//
// The purpose of the component bitfield is to enable Systems to act on
// appropriate entities. Systems will only update entities which have
// components for which they are concerned.
export default class ComponentManager {
  components = [];
  knownKeys = new Set();

  register (...components) {
    components.forEach(c => this.components.push(c));
  }

  createComponentKey (...components) {
    let mask = Array(this.components.length).fill(0);

    components.forEach(c => {
      let i = this.components.indexOf(c);

      if (i !== '-1') {
        mask[i] = 1;
      }
      else {
        mask[i] = 0;
      }
    });

    let key = Symbol(mask);
    this.knownKeys.add(key);
    return key;
  }

  indexOf (name) {
    let i = this.components.indexOf(name);
    if (i !== '-1') {
      return i;
    }
    else {
      return false;
    }
  }

  translateQuery(query) {
    /*
    queries expected as a list of component names:
    ['name', 'position', 'movement']
    */
    let index = -1,
      componentIndexMap = new Map();
    query.forEach(c => {
      index = this.components.indexOf(c);
      if (index !== -1) {
        componentIndexMap.set(index, c);
      }
    });
  }

  *componentKeysFeed() {
    for (let k in this.knownKeys) {
      yield k;
    }
  }
}