import { 
    PointLight,
 } from "../three/three.module.js";
 /** 
  * Vincent Testagrossa
  * CMSC 405
  * Project 3 - Three JS
 * 
 * Structure for the project came from - https://discoverthreejs.com/book/
  */
/**
 * Creates the flickering light effect for the rocket exhaust. 
 * Intensity doesn't matter here when pointLight is created, since it will flicker between the base and max intensity
 * values during animation. Could be tied to delta if needed, but I wanted it to flicker at a similar rate as the flame
 * flicker effect.
 */
function createPointLight() {
    const pointLight = new PointLight('blue', 4, 0, 0);
    const baseIntensity = 3;
    const maxIntensity = 10;
    pointLight.tick = (delta) => {
        pointLight.intensity = maxIntensity - (Math.random() * baseIntensity);
    }

    return pointLight;
}

export { createPointLight }