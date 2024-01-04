import { World } from "./World/World.js";
/** 
 * Vincent Testagrossa
 * CMSC 405
 * Project 3 - Three JS
 * 
 * Structure for the project came from - https://discoverthreejs.com/book/
 */
/*
 *Main function that handles connecting the container to #scene-container and passing the parameter to the World.
 world has two functions that need to be called here, which are start() and init().

 start(): Begins the animation/update loop for the entire application.

 init(): Begins the async calls needed to load the GLTF models asynchronously (to prevent slowdowns during loading).
*/
async function main() {
    const container = document.querySelector('#scene-container');

    const world = new World(container);

    world.start();

    await world.init();
}

//Error handling for async functions
main().catch((err) => {
    console.error(err);
});