// Entity management
const DEFAULT_STACK_CTOR = Uint32Array,
  DEFAULT_STACK_SIZE = 100;


export default class EntityManager {
  // entities stack
  entities;

  // last created index
  lastIndex = 0;

  // mapping between component key and entity ids
  // [Symbol(componentsKey)]: [0,1,2,3]
  componentEntityMap = new Map();

  // actual component values
  // [entityId]: {
  //  "foo": 100
  // }
  entityComponents = new Map();

  constructor(entities) {
    // if a stack is not provided, create the default variety.
    if (entities === undefined) {
      this.entities = new DEFAULT_STACK_CTOR(DEFAULT_STACK_SIZE);
    }
    else {
      this.entities = entities;
    }
  }

  // Factory fn for entities (though they are just integer ids).
  create() {
    return this._getId();
    //return Symbol();
  }

  // Add an entry to the mapping [Symbol(id)]->{components}
  attachComponents(id, components) {
    this.entityComponents.set(
      id, components
    );
  }

  // Add an entry to the mapping [Symbol(componentsKey)]->[ids]
  register(id, componentsKey) {
    if (!this.componentEntityMap.has(componentsKey)) {
      this.componentEntityMap.set(
        componentsKey, [id]
      );
    }
    else {
      let ids = this.componentEntityMap.get(componentsKey);
      ids.push(id);
      this.componentEntityMap.set(componentsKey, ids);
    }
  }

  // Retrieve list of entities from a componentsKey
  query(componentsKey) {
    // change this to return any entity that has the members of the
    // componentsKey as a subset of its components.

    // for k, v of componentEntityMap
    // is k a superset of componentsKey?
    let matches = new Set();
    for (let [k, v] of this.componentEntityMap) {
      if (k.isSuperset(componentsKey)) {
        for (let entity of v) {
          matches.add(entity);
        }
      }
    }
    if (matches.size > 0) {
      return matches
    }
  }

  _getId() {
    let id = this.lastIndex;
    ++this.lastIndex;
    return id;
  }

  // Generator which will return (entityId, {components})
  *entityFeed(componentsKey) {
    let ids = this.query(componentsKey);
    for (let entity of ids) {
      if (typeof entity === 'string') {
        console.warn(
          'Warning: `for..in` improperly cast `number` to `string`'
        );
        entity = Number(entity);
      }

      yield {
        entity,
        components: this.entityComponents.get(entity)
      }
    }
  }
}