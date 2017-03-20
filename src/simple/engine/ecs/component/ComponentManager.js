// Component Manager
// Responsibilities:
// * Registering components
// * Defining how components are added to entity keys
//
// `createComponentKey` creates the central primary key for ECS data. Given
// a list of component names, it will create a key composed of a Set of these
// names, so that supersets of bundles of components match. The user keeps the
// return value of `createComponentKey` and uses it for `register()` methods.
// In spite of this explanation, the keys themselves are meant to be opaque
// for future changes.
//
// The other responsibility of this object is fulfilled by its feed of all
// extant keys.

// Set implementation with convenient Set operations.
class ComponentKeySet extends Set {
  isSuperset(subset) {
      for (var elem of subset) {
          if (!this.has(elem)) {
              return false;
          }
      }
      return true;
  }
}


export default class ComponentManager {
  // All extant keys
  knownKeys = new Set();

  // Create an opaque-by-convention key.
  createComponentKey (...components) {
    let key = new ComponentKeySet(...components);
    this.knownKeys.add(key);
    return key;
  }

  // Will yield every extant key.
  *componentKeysFeed() {
    for (let k in this.knownKeys) {
      yield k;
    }
  }
}