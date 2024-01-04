//import components
import { createCamera } from "./Components/camera.js";
import { createSkybox } from "./Components/skybox.js";
import { createScene } from "./Components/scene.js";
import { createLights } from "./Components/lights.js";
import { loadDonut } from "./Components/prototypes/donut.js";
import { loadSpaceship } from "./Components/prototypes/spaceship.js";
import { createPointLight } from "./Components/pointLight.js";

//import systems
import { createControls } from "./Systems/controls.js";
import { createRenderer } from "./Systems/renderer.js";
import { Resizer } from "./Systems/Resizer.js";
import { Loop } from "./Systems/loop.js";
import { GUI } from "./DatGUI/dat.gui.module.js";

/** 
 * Vincent Testagrossa
 * CMSC 405
 * Project 3 - Three JS
 * 
 * Structure for the project came from - https://discoverthreejs.com/book/
 */
/**
 * This is the meat of the classes. The constructor builds the initial condidions used to do everything else, like creating
 * the scene, camera, and renderer. The GUI is initialized and the container is appended with the gui and the viewport. The 
 * non-async objects are initialized and added to the loop.updatables list, as well as the scene(skybox and lighting).
 * 
 * The asynchronous init() loads all of the gltf meshes and adds them sequentially to updatables and the scene (once they're loaded).
 * The gui is initialized here because it needs to wait on all of the meshes to be fully loaded before it can hook them.
 */

//Module scoped variables for use with the GUI (and some other functions)
let camera, controls, renderer, scene; 
let loop;
let hemiLight, dirLight;
let ship, shipLight, skybox, donut = [];
let gui;

class World {
    // 1. Create an instance of the World app
    constructor(container) {
        scene = createScene();
        camera = createCamera();
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);

        
        gui = new GUI({ 
            autoPlace: true,
            width: 300,
         });
        gui.closed = false;
        container.append( gui.domElement, renderer.domElement);
        controls = createControls(camera, renderer.domElement);


        skybox = createSkybox();
        const { hemisphereLight, directLight } = createLights();
        hemiLight = hemisphereLight, dirLight = directLight;

        loop.updatables.push(controls);

        //Wrap in separate function to add/remove each
        scene.add(skybox);
        scene.add(hemiLight, dirLight);

        const resizer = new Resizer(container, camera, renderer);
    }

    async init() {
        //asynchronous loading for .glb models
        
        //loads the spaceship parameters so it can be placed into the module variable, ship.
        const { spaceship, flame1, flame2, flame3 } = await loadSpaceship();
        ship = {spaceship: spaceship, flame1: flame1, flame2: flame2, flame3: flame3};

        //creates the pointLight that represents the light from the thruster
        shipLight = createPointLight();
        shipLight.translateZ(-4);

        //Creates and adds 100 donuts to the scene, using the random placement from donut.js
        for (var i = 0; i < 100; i++){
            const mesh = await loadDonut();
            donut[i] = mesh;
            scene.add(donut[i]);
            loop.updatables.push(donut[i]);
        }

        //sets the controls position to the center of the ship.
        controls.target.copy(ship.spaceship.position);

        //pushes all the updateables for the ship to the animation loop
        loop.updatables.push(ship.spaceship, ship.flame1, shipLight, ship.flame2, ship.flame3);
        //adds all of the parts to the scene.
        scene.add( ship.spaceship, shipLight, ship.flame1, ship.flame2, ship.flame3);

        //now that everything is loaded, the gui can be initialized.
        this.guiInit();

    }
    
    // 2. Render the scene
    render() {
        renderer.render(scene, camera);
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }

    /**
     * Adds all of the folders and controls to dat.gui. Each control will bind on a single property and automatically
     * determine the type of component to add based on the type of data. Boolean types generate checkboxes, numeric values
     * create sliders, and function calls create buttons.
     * 
     * See https://github.com/dataarts/dat.gui/blob/master/API.md for the API instructions.
     */
    guiInit() {
        //controls for lighting, including the hemisphere light, and directional light.
        //options to vary the intensity (within a range) and toggle the lights on or off
        const lightFolder = gui.addFolder("Lights");
        lightFolder.add(hemiLight, 'intensity').min(0).max(10).name('Hemisphere Light:');
        lightFolder.add(hemiLight, 'visible').name("Enabled:");
        lightFolder.add(dirLight, 'intensity').min(0).max(10).name('Diretional Light:');
        lightFolder.add(dirLight, 'visible').name("Enabled:");
        lightFolder.add(shipLight, 'visible').name("Thrust Light Enabled:");

        //controls to toggle the different meshes/models that were imported from my blender projects.
        //Skybox textures were provided by https://opengameart.org/content/ulukais-space-skyboxes under the creative commond
        //license
        const modelFolder = gui.addFolder("Enable/Disable Models");
        modelFolder.add(ship.spaceship, 'visible').name("Ship");
        modelFolder.add(ship.flame1, 'visible').name("Rocket Flame 1");
        modelFolder.add(ship.flame2, 'visible').name("Rocket Flame 2");
        modelFolder.add(ship.flame3, 'visible').name("Rocket Flame 3");
        modelFolder.add(skybox, 'visible').name("Skybox:");
        modelFolder.add(this, 'toggleDonuts').name("Toggle Donuts");

        const animationFolder = gui.addFolder("Animation Control");
        animationFolder.add(loop, 'start').name("Start Animation");
        animationFolder.add(loop, 'stop').name("Stop Animation");
    }

    /**
     * Function call to toggle the visibility for every donut.
     */
    toggleDonuts(){
        for (var i = 0; i < donut.length; i++){
            donut[i].visible = !donut[i].visible;
        }
    }
}
    
    export { World };