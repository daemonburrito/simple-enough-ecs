export default class SystemQueue {
  sort = true;

  constructor(queue) {
    if (this.sort === true && queue.length > 1) {
      queue.sort(this._prioComparator);
    }

    this.queue = queue;
  }

  run(entity, components) {
    //console.log('systemQueue', entity, components);
    this.queue.forEach(v => v.update(entity, components));
  }

  static _prioComparator(a, b) {
    if (!('priority' in a) || !('priority' in b)) {
      throw Error("Can't sort without priorities");
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

