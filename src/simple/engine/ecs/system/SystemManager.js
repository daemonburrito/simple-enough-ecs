// Systems management
//
// A game world will probably only need one of these, but there is no limit;
// this is not a singleton class. Its API, as exposed to a game loop, is just
// `update()`. From the point of view of the game mechanics and implementation,
// it offers a series of data types like queues for specifying order and
// priority of world updates.


class SystemQueue {
  sort = true;

  constructor(queue) {
    if (this.sort === true && queue.length > 1) {
      let _queue = [];
      _queue.sort(this._prioComparator);
    }

  }

  run(entity, components) {
    this.queue.forEach(v => v(entity, components));
  }

  static _prioComparator(a, b) {
    if (!('priority' in a) || !('priority' in b)) {
      throw Error("Can't sort with priorities");
    }
    if (a.priority <= b.priority) {
      return -1;
    }
    else if (a.priority > b.priority) {
      return 1;
    }

    return 0;
  }
}


export default class SystemManager {
  queues = new Map();

  register_queue(queue, componentsKey, sort) {
    this.queues.set(componentsKey, new SystemQueue(queue, sort));
  }

  register(systemObj, componentsKey, queueSlug) {
    this.queue[queueSlug].push(systemObj);

    return systemObj;
  }

  // Return a queue of systems that are associated with a ComponentsKey
  query(componentsKey) {
    return this.queues.get(componentsKey);
  }

  runQueue(componentsKey, entity, components) {
    this.queues.get(componentsKey).run(entity, components);
  }
}