import { 
    DirectionalLight,
    HemisphereLight,
 } from "../three/three.module.js";
 /** 
  * Vincent Testagrossa
  * CMSC 405
  * Project 3 - Three JS
 * 
 * Structure for the project came from - https://discoverthreejs.com/book/
  */
/**
 * Basic lighting effects for World.js. The hemisphereLight really only effects the 'windscreen' of the spaceship, while
 * the directionalLight impacts the whole scene. It's close to the center, so the intensity is only set to 6, but can be adjusted
 * up or down using the dat.gui controls.
 */
function createLights() {
    const hemisphereLight = new HemisphereLight(
        'white',
        'darkgrey',
         4
        );
    
    const directLight = new DirectionalLight('white', 6);
    directLight.position.set(0, 100,-10);

    return { hemisphereLight, directLight };
}

export { createLights };