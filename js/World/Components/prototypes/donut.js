import { GLTFLoader } from "../../three/GLTFLoader.js";
import { MathUtils } from "../../three/three.module.js";
/** 
 * Vincent Testagrossa
 * CMSC 405
 * Project 3 - Three JS
 * 
 * Structure for the project came from - https://discoverthreejs.com/book/
 */
async function loadDonut() {
    //used to load the model from blender
    const loader = new GLTFLoader();

    const donutData = await loader.loadAsync("/assets/models/donut.glb");
    //Was only used for testing.
    //console.log('mmmm...donut', donutData);
    const donut = donutData.scene.children[0];


    donut.position.y = 1 + Math.random() * 2;
    donut.position.x = -5 + Math.random() * 10;
    donut.position.z = 5 + Math.random() * 10;

    const rotDirection = Math.floor(Math.random()*3);
    //gives rotation in both directions (or none);
    const rotSpeed = MathUtils.degToRad(40 - Math.random() * 80);

/**
 * The tick method is called by the loop system. Animates the rotation of the donut depending on a couple fo pseudorandom numbers.
 * 
 * First: the rotDirection is determined by a randomly generated number between 0 and 2, where 0 rotates on the x, 1 rotates on y,
 * and 2 rotates on x, y, and z axes.
 * 
 * Second: the rotSpeed is a random number between -40 and 40 degrees, converted to radians, then multiplied by the delta (provided by
 * the clock) to ensure the rotations will animate smoothly if the framerate changes.
 * 
 */
    donut.tick = (delta) => {
        switch(rotDirection){
            case 0:
                donut.rotation.x += delta * rotSpeed;
                break;
            case 1:
                donut.rotation.y += delta * rotSpeed;
                break;
            case 2:
                donut.rotation.x += delta * rotSpeed;
                donut.rotation.y += delta * rotSpeed;
                donut.rotation.z += delta * rotSpeed;
                break;
            default:
                break;
        }

        //make the donut move from forward of the ship towards aft.
        donut.position.z -= 0.025;
        //loop the donut in front of the ship when it reaches z = -10
        //this seems to be enough to have a constant stream of 'debris' for the ship to travel through.
        if (donut.position.z < -8){
            donut.position.z = 10;
        }
    }

    return donut;
}

export { loadDonut };