import {
  System,
  constants
} from './lib/simple.es.js';


class MovementSystem extends System {
  update(entity, components) {
    let dirRads = constants.tables.DEGREES_TO_RADIANS[components.direction];

    components.position[0] += Math.sin(dirRads) * components.speed;
    components.position[1] += Math.cos(dirRads) * components.speed;
    components.position[2] += .1;
  }
}


class SpritePositionSystem extends System {
  update(entity, components) {
    components.sprite.position.x = components.position[0];
    components.sprite.position.y = components.position[1];
    components.sprite.position.z = components.position[2];
  }
}


class KeyboardInputSystem extends System {
  constructor() {
    super();
    window.addEventListener('keydown', (ev) => {
      this.lastKeyPressed = ev.keyCode;
    });

    window.addEventListener('keyup', (ev) => {
      this.lastKeyPressed = false;
    });

    this.ktod = {
      37: 270,
      38: 0,
      39: 90,
      40: 180
    };
  }

  update(entity, components) {
    if (this.lastKeyPressed) {
      if (~Object.keys(this.ktod).indexOf(String(this.lastKeyPressed))) {
        components.direction = this.ktod[this.lastKeyPressed];
      }
      else {
        switch (this.lastKeyPressed) {
          case 65: // "a"
          components.speed += 0.1;
          break;

          case 90: // "z"
          components.speed -= 0.1;
          break;
        }
      }
    }
  }
}


export {
  MovementSystem,
  SpritePositionSystem,
  KeyboardInputSystem
};
