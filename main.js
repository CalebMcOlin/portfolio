import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createAmbientLight, createPointLight, createRectLight } from './src/lights';
import { createSphere, createPlane, createBackground } from './src/objects';
import { gsap } from "gsap";

// SCENE
export const scene = new THREE.Scene();

// RENDERER
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
// renderer.shadowMap.enabled = false;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio, 2);

// CAMERA
export const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(100, 0, 0);

// RESIZING
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio, 2);
}

// OBJECTS
const plane = createPlane(800, 800, 100, 100, 0x292929, 0, 0, '/images/plane-displacement.jpg', 110, -55, { x: 0, y: -5, z: 0 }, false);
const planeGrid = createPlane(800, 800, 100, 100, 0x035ee8, 0, 0, '/images/plane-displacement.jpg', 110, -55, { x: 0, y: -5, z: 0 }, true);
const sphere1 = createSphere("Sphere 1", 0.5, 0x292929, 1, 0.2, './images/sphere-normal-map.jpg', { x: -20, y: -20, z: -20 });
const sphere2 = createSphere("Sphere 2", 0.5, 0x292929, 1, 0.2, './images/sphere-normal-map.jpg', { x: 134.5, y: -28.2, z: -13.6 });
const sphere3 = createSphere("Sphere 3", 0.5, 0x292929, 1, 0.2, './images/sphere-normal-map.jpg', { x: -200, y: 10, z: 27 });

// LIGHTS
const aLight1 = createAmbientLight(0xffffff, .6);
const rLight1 = createRectLight(0x9700CC, 1000, 1000, 1, { x: 0, y: -59.9, z: 0 }, { x: 0, y: -100, z: 0 });
const pLight1 = createPointLight(0x9700cc, 10, { x: 11, y: -33, z: -100 });
const pLight2 = createPointLight(0xe0a919, 0, { x: -3.1, y: 50, z: -4.6 });
const pLight3 = createPointLight(0xffffff, 0, { x: 2.3, y: 0, z: 5.5 });

// ADD TO SCENE
scene.background = createBackground();
scene.add(plane);
scene.add(planeGrid);
scene.add(sphere1);
scene.add(sphere2);
scene.add(sphere3);
scene.add(rLight1);
scene.add(aLight1);
// scene.add(pLight1);
// scene.add(pLight2);
// scene.add(pLight3);

// MOVEMENTS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

document.getElementById('btn-1').addEventListener("click", (event) => { moveToSphere(sphere1, { x: 0, y: 0, z: 0 }, event); }, false);
document.getElementById('btn-2').addEventListener("click", (event) => { moveToSphere(sphere2, { x: 0, y: 0, z: 0 }, event); }, false);
document.getElementById('btn-3').addEventListener("click", (event) => { moveToSphere(sphere3, { x: -30, y: -120, z: -90 }, event); }, false);

function moveToSphere(targetPos, focalPos) {
  // Setting up for vector and postion caculation
  const cameraLoc = new THREE.Vector3(); // Camera's position behind the target
  const dir = new THREE.Vector3(); // The vector between the center of 3D map and target.
  const unitsFromTarget = 6; // units camera is from the target
  const focalLoc = new THREE.Vector3(focalPos.x, focalPos.y, focalPos.z); // focal point behind the target (set at center of 3D map)
  const targetLoc = targetPos.position; // Target's position

  // Caclating the position of the camera behing the targets location on the same vector as the target and center of 3D map
  cameraLoc.addVectors(targetLoc, dir.subVectors(targetLoc, focalLoc).normalize().multiplyScalar(unitsFromTarget));

  // Animate movement/position of camera
  gsap.to(camera.position, {
    x: cameraLoc.x,
    duration: 4
  });
  gsap.to(camera.position, {
    y: cameraLoc.y,
    duration: 4
  });
  gsap.to(camera.position, {
    z: cameraLoc.z,
    duration: 4
  });

  // Animate aim of camera
  gsap.to(controls.target, {
    x: focalLoc.x,
    duration: 4
  });
  gsap.to(controls.target, {
    y: focalLoc.y,
    duration: 4
  });
  gsap.to(controls.target, {
    z: focalLoc.z,
    duration: 4
  });
};

// ANIMATE LOOP
function animate() {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
};


// DEBUG ** DEVELOPMENT USE ONLY ** DEBUG //
import * as dat from 'dat.gui';
const gui = new dat.GUI();
function lightDebugHelper(light1, light2, light3) {
  // Helpers
  const lightHelper1 = new THREE.PointLightHelper(light1, 0.5);
  const lightHelper2 = new THREE.PointLightHelper(light2, 0.5);
  const lightHelper3 = new THREE.PointLightHelper(light3, 0.5);
  scene.add(lightHelper1);
  scene.add(lightHelper2);
  scene.add(lightHelper3);

  // GUI interface
  const lightFolder1 = gui.addFolder('Light 1');
  lightFolder1.add(light1.position, 'x').min(-1000).max(1000).step(0.5);
  lightFolder1.add(light1.position, 'y').min(-1000).max(1000).step(0.5);
  lightFolder1.add(light1.position, 'z').min(-1000).max(1000).step(0.5);
  lightFolder1.add(light1, 'intensity').min(0).max(10).step(0.01);
  const light1Color = { color: 0xffffff };
  lightFolder1.addColor(light1Color, 'color').onChange(() => {
    light1.color.set(light1Color.color)
  });
  const lightFolder2 = gui.addFolder('Light 2');
  lightFolder2.add(light2.position, 'x').min(-1000).max(1000).step(0.5);
  lightFolder2.add(light2.position, 'y').min(-1000).max(1000).step(0.5);
  lightFolder2.add(light2.position, 'z').min(-1000).max(1000).step(0.5);
  lightFolder2.add(light2, 'intensity').min(0).max(10).step(0.01);
  const light2Color = { color: 0xffffff };
  lightFolder2.addColor(light2Color, 'color').onChange(() => {
    light2.color.set(light2Color.color)
  });
  const lightFolder3 = gui.addFolder('Light 3');
  lightFolder3.add(light3.position, 'x').min(-1000).max(1000).step(0.5);
  lightFolder3.add(light3.position, 'y').min(-1000).max(1000).step(0.5);
  lightFolder3.add(light3.position, 'z').min(-1000).max(1000).step(0.5);
  lightFolder3.add(light3, 'intensity').min(0).max(10).step(0.01);
  const light3Color = { color: 0xffffff };
  lightFolder3.addColor(light3Color, 'color').onChange(() => {
    light3.color.set(light3Color.color)
  });

  // Camera location finder
  window.addEventListener("click", clicking, false);
  function clicking() {
    console.log("x " + camera.position.x);
    console.log("y " + camera.position.y);
    console.log("z " + camera.position.z);
  };
};
// lightDebugHelper(pLight1, pLight2, pLight3);
// DEBUG ** DEVELOPMENT USE ONLY ** DEBUG //


animate();
