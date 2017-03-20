export default class World {
  constructor(attributes) {
    this.attributes = attributes;
    this.stopped = false;
  }

  update() {
    //console.log("Updating world.");
    // get key from keys feed
    // get entity, components tuples from entities feed
    for (let k of this.componentManager.knownKeys) {
      // Opportunity to parallelize here
      for (let {entity: e, components: c} of this.entities.entityFeed(k)) {
        this.systems.runQueue(k, e, c);
      }
    }
  }

  // Start simulation loop
  go(loopFrame) {
    //console.log("Simulation started.");
    return loopFrame();
    //return requestAnimationFrame(loopFrame);
  }

  // Stop simulation loop
  stop(loopFrame, reqId) {
    console.log('Stopped', reqId);
    this.stopped = true;

    cancelAnimationFrame(reqId);
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