// This loop is one solution for decoupling the render clock from the physics or mechanic clock; a typical configuration is 20Hz for the physics, and 60 fps for the rendering (or vsync, or `requestAnimationFrame` fps).

// game loop
const TARGET_FPS = 30,
  FRAME_DURATION = 1000 / TARGET_FPS;

let previousTime = 0,
  lag = 0,
  elapsed = 0,
  lagOffset = 0;

const update = () => {
  //console.log('** Update (noop)');
};

const render = (lagOffset) => {
  //console.log('** Render (noop)', lagOffset);
};


const Frame = function (hrt) {
  //console.log("** Animation frame", this);

  if (!hrt) {
    hrt = 0;
  }

  elapsed = hrt - previousTime;
  lag += elapsed;

  while (lag >= FRAME_DURATION) {
    this.update();

    lag -= FRAME_DURATION;
  }

  lagOffset = lag / FRAME_DURATION;

  this.update();
  this.render(lagOffset);

  previousTime = hrt;

  requestAnimationFrame(Frame.bind(this));

};

export default Frame;
export {
  Frame, update, render
};