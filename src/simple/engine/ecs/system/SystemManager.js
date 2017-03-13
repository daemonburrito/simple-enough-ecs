// Systems management
//
// A game world will probably only need one of these, but there is no limit;
// this is not a singleton class. Its API, as exposed to a game loop, is just
// `update()`. From the point of view of the game mechanics and implementation,
// it offers a series of data types like queues for specifying order and
// priority of world updates.


export default class SystemManager {
  queues = new Map();

  register_queue(queue, componentsKey) {
    this.queues.set(componentsKey, queue);
  }

  // register(systemObj, componentsKey, queueSlug) {
  //   this.queue[queueSlug].push(systemObj);
  //
  //   return systemObj;
  // }

  // Return a queue of systems that are associated with a ComponentsKey
  query(componentsKey) {
    return this.queues.get(componentsKey);
  }

  runQueue(componentsKey, entity, components) {
    if (this.queues.has(componentsKey)) {
      this.queues.get(componentsKey).run(entity, components);
    }
  }
}