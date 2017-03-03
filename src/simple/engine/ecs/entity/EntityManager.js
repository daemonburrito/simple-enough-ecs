// An object with some convenience methods for entities and components. More
// than one instance can exist at runtime.
export default class EntityManager {
  // entities stack
  entities;
  count;

  constructor(entities) {
    this.entities = entities;
    this.count = 0;
  }

  createEntity() {
    this.entities[this.count] = this.count;
    ++this.count;
    return this._wrapEntity(this.entities[this.count-1]);
  }

  _wrapEntity(entity) {
    return {
      entity
    };
  }
}