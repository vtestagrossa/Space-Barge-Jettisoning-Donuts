import { PerspectiveCamera } from "../three/three.module.js";

/** 
 * Vincent Testagrossa
 * CMSC 405
 * Project 3 - Three JS
 * 
 * Structure for the project came from - https://discoverthreejs.com/book/
 * 
 * Just a file to contain the camera.
 */
function createCamera() {
    const camera = new PerspectiveCamera(
        45,     //FOV
        1,      //Aspect ratio placeholder
        0.1,    //Near
        1000,    //Far
    );

    //set camera position. Puts the spaceship nicely in frame with light reflecting.
    camera.position.set(-10, 5, 5);

    return camera;
}

export { createCamera };