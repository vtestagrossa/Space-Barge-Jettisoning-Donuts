import { Clock } from "../three/three.module.js";
/** 
 * Vincent Testagrossa
 * CMSC 405
 * Project 3 - Three JS
 * 
 * Structure for the project came from - https://discoverthreejs.com/book/
 */
/**
 * Takes the camera, scene, and renderer as parameters and uses those to re-render the scene with updated positions for
 * controls (OrbitControls.js), and animations. Updatables is the list of any object that needs to be animated (passed
 * from World.js). 
 * 
 * start(): Sets the animationLoop for the renderer to render the scene and camera every tick. 
 * 
 * stop(): sets the animationloop to null (stops the animations);
 * 
 * tick(): Uses the clock to get the delta between frames, which can then be passed to the updatables.tick(delta) for
 * use within each object's tick function. Calls all of the updatables tick() functions in the loop.
 */
const clock = new Clock();

class Loop {
    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
    }

    start() {
       this.renderer.setAnimationLoop(() => {
        this.tick();

        this.renderer.render(this.scene, this.camera);
       });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    tick() {
        // only call the getDelta once per frame
        const delta = clock.getDelta();

        for (const object of this.updatables) {
            object.tick(delta);
        }
    }
}

export { Loop };