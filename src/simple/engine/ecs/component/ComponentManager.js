// Component Manager
// Responsibilities:
// * Registering components
// * Defining how components are added to entity keys
//
// `createComponentKey` creates the central primary key for ECS data. Given
// a list of component names, it will create a key composed of a Set of these
// names, so that identical bundles of components match.  he user keeps the
// return value of `createComponentKey` and uses it for `register()` methods.
//
// The other responsibility of this object is fulfilled by its feed of all
// extant keys. 
export default class ComponentManager {
  knownKeys = new Set();

  createComponentKey (...components) {
    let key = new Set(components);
    this.knownKeys.add(key);
    return key;
  }

  *componentKeysFeed() {
    for (let k in this.knownKeys) {
      yield k;
    }
  }
}