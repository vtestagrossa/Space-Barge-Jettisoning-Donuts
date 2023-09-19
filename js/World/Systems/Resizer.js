
/** 
 * Vincent Testagrossa
 * CMSC 405
 * Project 3 - Three JS
 * 
 * Structure for the project came from - https://discoverthreejs.com/book/
 */
/**
 * Listens for the resize event on the window and calls setSize based on the container's height and width. Resets the camera's
 * aspect ratio and updates the projection matrix, and sets the size of the renderer/the pixel ratio during any resize event.
 */

const setSize = (container, camera, renderer) => {
  
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
}

class Resizer {
    constructor(container, camera, renderer) {
      //set size onload
      setSize(container, camera, renderer);

      window.addEventListener("resize", () => {
        //resize the container and renderer if the window resizes
        setSize(container, camera, renderer);
        //used to call from other classes
        this.onResize();
      });
    }
    onResize() {}
  }
  
  export { Resizer };