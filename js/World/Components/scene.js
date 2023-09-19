import { Color, Scene } from "../three/three.module.js";
/** 
 * Vincent Testagrossa
 * CMSC 405
 * Project 3 - Three JS
 * 
 * Structure for the project came from - https://discoverthreejs.com/book/
 */
/**
 * Creates the scene for World.js and sets the background to black.
 */
function createScene() {
    const scene = new Scene();

    scene.background = new Color("black");

    return scene;
}

export { createScene };