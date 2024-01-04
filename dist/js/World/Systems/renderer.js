import { WebGLRenderer } from "../three/three.module.js";
/** 
 * Vincent Testagrossa
 * CMSC 405
 * Project 3 - Three JS
 * 
 * Structure for the project came from - https://discoverthreejs.com/book/
 */
/**
 * Creates the WebGLRenderer with antialiasing on. The setAnimationLoop is started and the scene and camera are rendered.
 * 
 */
function createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true });

    // start the animation loop
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
    renderer.physicallyCorrectLights = true;

    return renderer;
}

export { createRenderer };