export default class World {
  constructor(attributes) {
    this.attributes = attributes;
  }

  set ComponentManager(manager) {
    if (typeof this.components != 'undefined') {
      /*eslint no-console: 0 */
      console.warn('Replacing existing world ComponentManager:',
        this.components);
    }

    this.componentManager = manager;
  }

  get components() {
    return this.componentManager;
  }

  set EntityManager(manager) {
    if (typeof this.entities != 'undefined') {
      /*eslint no-console: 0 */
      console.warn('Replacing existing world EntityManager:',
        this.entities);
    }

    this.entityManager = manager;
  }

  get entities() {
    return this.entityManager;
  }
}