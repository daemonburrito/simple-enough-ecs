// This loop is one solution for decoupling the render clock from the physics or mechanic clock; a typical configuration is 20Hz for the physics, and 60 fps for the rendering (or vsync, or `requestAnimationFrame` fps).

// game loop
const TARGET_FPS = 30,
  FRAME_DURATION = 1000 / TARGET_FPS;

let previousTime = 0,
  lag = 0,
  elapsed = 0,
  lagOffset = 0;

const update = () => {
  //console.log('update');
};

const render = (lagOffset) => {
  /*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
  console.log('render', lagOffset);
};


const frame_ = (hrt) => {
  requestAnimationFrame(frame_);

  if (!hrt) {
    hrt = 0;
  }

  elapsed = hrt - previousTime;
  lag += elapsed;

  while (lag >= FRAME_DURATION) {
    update();

    lag -= FRAME_DURATION;
  }

  lagOffset = lag / FRAME_DURATION;

  render(lagOffset);

  previousTime = hrt;
};


export default frame_;
