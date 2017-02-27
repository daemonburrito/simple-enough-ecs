// An object with some convenience methods for entities and components. More
// than one instance can exist at runtime.
export default class EntityManager {
  // entities stack
  entities;

  constructor(entities) {
    this.entities = entities;
  }
}