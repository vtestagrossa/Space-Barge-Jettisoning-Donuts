/** 
 * Vincent Testagrossa
 * CMSC 405
 * Project 3 - Three JS
 * 
 * I followed a tutorial from: https://codinhood.com/post/create-skybox-with-threejs and adapted it to this project. The function
 * for the pathstrings and materialarray were used and this script file was adapted to the style of
 *  https://discoverthreejs.com/book/ that's used throughout this project.
 */

import { 
    BoxBufferGeometry,  //cube geometry
    BackSide,           //to map the different textures to the backside of the cube used in the skybox
    Mesh,               //for the material
    MeshBasicMaterial,  //uses basic mesh to avoid having to use lighting
    TextureLoader,      //loads the textures
} from "../three/three.module.js";

/* 
    This function is used to get the paths to the skybox textures. 
*/
function createPathStrings(filename) {
    const basePath = "/assets/textures/skybox/"; //location for each texture
    const baseFilename = basePath + filename; //each file begins with the filename
    const fileType = ".png"; //append the filetype for each file
    const sides = ["ft", "bk", "up", "dn", "rt", "lf"]; // postpend for the side used

    //maps each side to pathstrings to be returned.
    const pathStrings = sides.map(side => {
        return baseFilename + "_" + side + fileType;
    });
    return pathStrings;
}

function createMaterialArray(filename) {
    const skyboxImagepaths = createPathStrings(filename);

    //maps the textures to materialArray using the skyboxImagePaths returned from createPathStrings
    //loads the textures inline while creating the materialArray
    const materialArray = skyboxImagepaths.map(image => {
        let texture = new TextureLoader().load(image);
    
        return new MeshBasicMaterial({
            map: texture,   //maps the textures to the texturemap of the cube
            side: BackSide, //places the texture on the inside of the cube
        });
    });

    return materialArray;
}

function createSkybox() {
    //Creates the skybox with the selected geometry. I kept this small to prevent any slowdowns, especially
    //since the ship isn't actually moving.
    const skyboxImage = "corona"; //The filename that all of the sides will be created from on geometry.
    const geometry = new BoxBufferGeometry(500, 500, 500); //make a big cube for the skybox

    const materialArray = new createMaterialArray(skyboxImage);

    const skybox = new Mesh(geometry, materialArray);

    return skybox;
}

export { createSkybox };