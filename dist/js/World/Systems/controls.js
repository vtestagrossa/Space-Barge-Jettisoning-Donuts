import { OrbitControls } from '../three/OrbitControls.js';
/** 
 * Vincent Testagrossa
 * CMSC 405
 * Project 3 - Three JS
 * 
 * Structure for the project came from - https://discoverthreejs.com/book/
 */
/**
 * Creates a new OrbitControls with the camera and canvas objects attached to it. The controls.tick() is used to update the controls
 * position, so if the animationloop is turned off, the controls stop working.
 */
function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);
    
    controls.enableDamping = true;
    
    controls.tick = () => controls.update();

    return controls;
}

export { createControls };