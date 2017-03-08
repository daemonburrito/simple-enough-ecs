// Entity management
const DEFAULT_STACK_CTOR = Uint32Array,
  DEFAULT_STACK_SIZE = 100;


export default class EntityManager {
  // entities stack
  entities;

  // last created index
  lastIndex = 0;

  // mapping between component key and entity ids
  componentEntityMap = new Map();

  // actual component values
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
    let id = this.lastIndex;
    ++this.lastIndex;
    return id;
  }

  attachComponents(id, ...components) {
    this.entityComponents.set(
      Symbol(id), components
    );
  }

  register(id, componentsKey) {
    let key = Symbol(componentsKey);

    if (!this.componentEntityMap.has(key)) {
      this.componentEntityMap.set(
        key, [id]
      );
    }
    else {
      let ids = this.componentEntityMap.get(key);
      ids.push(id);
      this.componentEntityMap.set(key, ids);
    }
  }
}