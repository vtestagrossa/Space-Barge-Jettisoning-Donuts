![image](https://github.com/vtestagrossa/Space-Barge-Jettisoning-Donuts/assets/25043181/dc49b94b-0f7f-40e9-acc1-8322731b79da)

Project Description

This project creates a unique 3D animated scene using the Three.js library. It includes two light sources, and many different shapes (a few cubes and many spheres). There are GUI widgets that control light intensity and visibility, mesh visibility, and turns on/off animations. The scene is a spaceship flying through an infinite field of donuts in space (with a skybox displaying the space background texture).

Program Usage

Running this program requires that a webserver hosts the directory where index.html resides. This project was tested using the http-server package for node.js, but others may work as well. A list of options have been made available on the Three.js website.

Installation

Installation of http-server requires the installation of node.js and npm. Once completed, the following command will install http-server globally so it can be run from anywhere in the filesystem:

	npm install --global http-server
 
A script is included to run the npm package http-server on port 80 using the following command in powershell:

	http-server -p 80
 
The user may use http://localhost, http://127.0.0.1, or http://[local_ip_address] in order to load the page once the server is running and hosting the “Project 3” directory. In Figure 3, localhost was used.

Using the Program

The scene uses OrbitControls to control the position of the camera with the following controls:

Rotate:

	Hold left click within the scene and move the mouse to rotate the view.
 
Zoom:

	Scroll the mouse wheel up or down to zoom in or out.
 
Pan:

	Hold right click, or hold shift (or CTRL) and hold left click to pan the scene in the direction the mouse is moved.

GUI

	Click the category to expand the folder you wish to view. Sliders may be adjusted by holding left click and dragging left or right, or may be manually changed by entering a number in the text field to the right. Checkboxes work like other checkboxes, in that they need to be clicked and released to toggle the checked state. To collapse the folders, the name of the folder may be clicked again. To hide the controls, click on close controls.
