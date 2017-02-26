// Generation and management of entity IDs

// entities are stored in a contiguous array of unsigned 32-bit integers
const create_entity_stack = (len) => {
  return new Uint32Array(len);
};


// An object with some convenience methods for entities and components. More
// than one instance can exist at runtime.
class EntityManager {
  // entities stack
  entities;

  constructor(entities) {
    this.entities = entities;
  }
}


// A mapping of an entity (id) and its EntityManager
class EntityMeta {
  entityManager;
  entity;
}

export {
  EntityManager,
  EntityMeta,
  create_entity_stack
}