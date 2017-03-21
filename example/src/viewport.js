import * as three from 'three';

export default class Viewport {
  // Set up display (DOM canvas)
  setup() {
    const canvas = window.document.querySelector('#viewport');
    const renderer = new three.WebGLRenderer({
      canvas,
      clearColor: [0,0,0,0]
    });

    renderer.setSize(800, 600);

    this.renderer = renderer;
    this.canvas = canvas;
  }
};