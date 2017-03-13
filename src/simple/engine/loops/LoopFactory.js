// Game loop factory API
//
// Use this to create ready-to-use callbacks to `requestAnimationFrame`, or
// parameter to `World.go(frame)`.
export default class Loop {
  constructor (rafFn, updateFn, renderFn) {
    if (rafFn) this.rafFn = rafFn;
    if (updateFn) this.updateFn = updateFn;
    if (renderFn) this.renderFn = renderFn;
  }

  build() {
    let bound = this.rafFn.bind({
      update: this.updateFn,
      render: this.renderFn
    });
    //console.log("** Bound new loop fn.");
    return bound;
  }
}