// Systems management
//
// A game world will probably only need one of these, but there is no limit;
// this is not a singleton class. Its API, as exposed to a game loop, is just
// `update()`. From the point of view of the game mechanics and implementation,
// it offers a series of data types like queues for specifying order and
// priority of world updates.
class AbstractSystemManager {
  update () {
    this._update();
  }

  _update () {

  }
}

// TODO Research alternatives to `super()`, for performance concerns.
// https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/apA.md
export default class SystemManager extends AbstractSystemManager {

  //eslint "constructor-super": null
  constructor () {

  }

  register_queue(queue) {

  }


}