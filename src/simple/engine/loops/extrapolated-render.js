// This loop is one solution for decoupling the render clock from the physics or mechanic clock; a typical configuration is 20Hz for the physics, and 60 fps for the rendering (or vsync, or `requestAnimationFrame` fps).

// game loop
const TARGET_FPS = 30,
  FRAME_DURATION = 1000 / TARGET_FPS;

// NOTE TODO v8 can't optimize "let compound assignment"; ie,
// `let foo = 0; foo += 1`. Someone needs to write Babel plugins that
// transform syntax like this for all low-hanging fruit with interpreters.
var previousTime = 0,
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
  if (!this.world.stopped) {
    return requestAnimationFrame(Frame.bind(this));
  }
  else {
    console.log('Stopped in frame');
  }
};

export default Frame;
export {
  Frame, update, render
};