// Game loop factory API
//
// Use this to create ready-to-use callbacks to `requestAnimationFrame`, or
// parameter to `World.go(frame)`.
export default class Loop {
  constructor (rafFn, updateFn, renderFn, world) {
    if (rafFn) this.rafFn = rafFn;
    if (updateFn) this.updateFn = updateFn;
    if (renderFn) this.renderFn = renderFn;
    if (world) this.world = world;
  }

  build() {
    let bound = this.rafFn.bind({
      update: this.updateFn,
      render: this.renderFn,
      world: this.world
    });
    //console.log("** Bound new loop fn.");
    return bound;
  }
}