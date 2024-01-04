import { GLTFLoader } from "../../three/GLTFLoader.js";
/** 
 * Vincent Testagrossa
 * CMSC 405
 * Project 3 - Three JS
 * 
 * Structure for the project came from - https://discoverthreejs.com/book/
 */

/**
 * Uses GLTFLoader to load models exported from blender. The spaceship is one of two models I created in Blender and contains
 * the main ship, and three concentric flame meshes. The initial goal was to use Blender for the flame animation using a volumetric
 * emission that was modified by a wave function, but I couldn't get the opacity to export properly. The emissive properties were
 * only "kind of" retained, which is why there's a point light added in World.js.
 */

async function loadSpaceship() {
    //needed to load the spaceship.glb
    const loader = new GLTFLoader();

    //uses await because loading is done asynchronously
    const spaceshipData = await loader.loadAsync("assets/models/spaceship.glb");
    //used in testing. Uncomment to see the children, animations, and group properties for the model
    //console.log('spaceship', spaceshipData);
    

    //Sets the variables to be exported to each of the children of spaceshipData, so it can be used in three.
    const spaceship = spaceshipData.scene.children[0];
    const flame1 = spaceshipData.scene.children[1];
    const flame2 = spaceshipData.scene.children[2];
    const flame3 = spaceshipData.scene.children[3];

    //GLTF export from blender didn't keep the opacity values
    flame1.material.opacity = 0.3;
    flame2.material.opacity = 0.3;
    flame3.material.opacity = 0.3;


    /**
     * Set up to be called by the loop. The flame ticks modify the rotation to give the effect of rocket exhaust
     * coming out at a high velocity. The values were tweaked until an adequate effect was obtained. Not tied to 
     * delta because it needs to be fast. This WILL slow down if the framerate drops significantly.
     */
    spaceship.tick = (delta) => {

    }
    flame1.tick = (delta) => {
        flame1.rotation.x = 1.5 + Math.random() * 0.08;
    };

    flame2.tick = (delta) => {
        flame2.rotation.x = 1.5 + Math.random() * 0.08;
    
        
    };

    flame3.tick = (delta) => {
        flame3.rotation.x = 1.5 + Math.random() * 0.08;
    
        
    };

    return { spaceship, flame1, flame2, flame3 };
}

export { loadSpaceship };