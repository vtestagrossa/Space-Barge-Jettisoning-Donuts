//import components
import { createCamera } from "./Components/camera.js";
import { createCube } from "./Components/cube.js";
import { createSkybox } from "./Components/skybox.js";
import { createScene } from "./Components/scene.js";
import { createLights } from "./Components/lights.js";

//import systems
import { createControls } from "./Systems/controls.js";
import { createRenderer } from "./Systems/renderer.js";
import { Resizer } from "./Systems/Resizer.js";
import { Loop } from "./Systems/loop.js";

//Module scoped variables
let camera;
let renderer;
let scene;
let loop;

class World {
    // 1. Create an instance of the World app
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);

        const skybox = createSkybox();
        const cube = createCube();
        const { ambientLight, directLight } = createLights();

        const controls = createControls(camera, renderer.domElement);
        
        //controls.target can't lock onto train
        //controls.target.copy(train);

        loop.updatables.push(controls);

        scene.add(skybox);
        scene.add(ambientLight, directLight);

        const resizer = new Resizer(container, camera, renderer);
        
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
}
    
    export { World };