import * as three from 'three';

export default class Camera {
  // three camera init
  setup() {
    const threeCam = new three.PerspectiveCamera(
      75, // Field of View
      4/3, // aspect ratio
      0.1, // near clipping plane
      1000 // far clipping plane
    );
    threeCam.position.z = 150;
    threeCam.position.x = 0;
    threeCam.position.y = 0;
    //threeCam.rotation = 0;

    this.camera = threeCam;
  };
}