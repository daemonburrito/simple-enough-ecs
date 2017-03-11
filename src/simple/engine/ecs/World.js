export default class World {
  constructor(attributes) {
    this.attributes = attributes;
  }

  update() {
    // get key from keys feed
    // get entity, components tuples from entities feed
    for (let k of this.components.knownKeys()) {
      // Opportunity to parallelize here
      for (let ecTuple of this.entities.entityFeed(k)) {
        let entity, components = ecTuple;
        this.systems.runQueue(k, entity, components);
      }
    }
  }

  // Start simulation loop
  go(loopFrame) {
    requestAnimationFrame(loopFrame.bind({
      update: this.update(),
      render: () => {}
    }));
  }

  // Stop simulation loop
  stop() {
    cancelAnimationFrame();
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

  set SystemManager(manager) {
    this.systemManager = manager;
  }

  get systems() {
    return this.systemManager;
  }
}