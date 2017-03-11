// Entity management
const DEFAULT_STACK_CTOR = Uint32Array,
  DEFAULT_STACK_SIZE = 100;


export default class EntityManager {
  // entities stack
  entities;

  // last created index
  lastIndex = 0;

  // mapping between component key and entity ids
  // [Symbol(componenstKey)]: [0,1,2,3]
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
  }

  // Add an entry to the mapping [Symbol(id)]->{components}
  attachComponents(id, ...components) {
    this.entityComponents.set(
      Symbol(id), components
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
    return this.componentEntityMap.get(componentsKey);
  }

  _getId() {
    let id = this.lastIndex;
    ++this.lastIndex;
    return id;
  }

  // Generator which will return (entityId, {components})
  *entityFeed(componentsKey) {
    let ids = this.componentEntityMap.get(componentsKey);
    for (let entity in ids) {
      yield entity, this.entityComponents.get(Symbol(entity));
    }
  }
}