import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createAmbientLight, createPointLight, createRectLight } from './src/lights';
import { createSphere, createPlane, createBackground, createTorus } from './src/objects';
import { movments } from './src/movement';

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
camera.position.set(-23.5, -23.5, -23.5); // Sphere1 Location

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
const plane = createPlane(1000, 1000, 100, 100, 0x292929, 0.5, 0.5, '/images/plane-hightmap.png', 110, -55, { x: 0, y: -5, z: 0 }, false);
const planeGrid = createPlane(1000, 1000, 100, 100, 0x290CFF, 0, 0, '/images/plane-hightmap.png', 110, -55, { x: 0, y: -5, z: 0 }, true);
const planeFlat = createPlane(1000, 1000, 1, 1, 0x000000, 0, 0, '', 0, 0, { x: 0, y: -59.5, z: 0 }, false);
const planeFlatGrid = createPlane(1000, 1000, 100, 100, 0xFF019A, 0, 0, '', 0, 0, { x: -59.5, y: -59, z: 0 }, true);
const sphere1 = createSphere("Sphere 1", 0.5, 0xFF10F0, .4, .5, './images/sphere-normal-map.jpg', { x: -20, y: -20, z: -20 });
const sphere2 = createSphere("Sphere 2", 0.5, 0x39FF14, .4, .5, './images/sphere-normal-map.jpg', { x: -180, y: 40, z: -30 });
const sphere3 = createSphere("Sphere 3", 0.5, 0xFF3131, .4, .5, './images/sphere-normal-map.jpg', { x: -200, y: 10, z: 27 });
const sphere4 = createSphere("Sphere 4", 0.5, 0x1F51FF, .4, .5, './images/sphere-normal-map.jpg', { x: 96, y: -30, z: 186 });
const sphere5 = createSphere("Sphere 5", 0.5, 0x9D00FF, .4, .5, './images/sphere-normal-map.jpg', { x: 277, y: -38, z: -205 });
const sphere6 = createSphere("Sphere 6", 0.5, 0xFFFF00, .4, .5, './images/sphere-normal-map.jpg', { x: -209, y: -43, z: -253 });
const torus = createTorus("Torus", 35, 2, 20, 64, 0xfff000, 0.5, 0.5, { x: 108, y: 40, z: 38 });

// LIGHTS
const aLight1 = createAmbientLight(0xffffff, .6);
// const rLight1 = createRectLight(0x9700CC, 1000, 1000, 1, { x: 0, y: -59.9, z: 0 }, { x: 0, y: -100, z: 0 }); // Not needed with PlaneFlat. Might replace
const torusLight = createPointLight(0xfff000, 2.8, 85, 2.5, { x: 112, y: 51, z: 37 });
// Lights for shapes
const pLight1 = createPointLight(0xffffff, 3, 5, 1.5, { x: -22, y: -20, z: -20.2 });
const pLight2 = createPointLight(0xffffff, 1.5, 2.5, 1, { x: -180, y: 41, z: -31 });
const pLight3 = createPointLight(0xffffff, 2, 7, 1, { x: -201.5, y: 9, z: 26 });
const pLight4 = createPointLight(0xffffff, 3, 5, 1, { x: 96.5, y: -31, z: 186.5 });
const pLight5 = createPointLight(0xffffff, 1.5, 4, 1, { x: 278.5, y: -38.5, z: -206 });
const pLight6 = createPointLight(0xffffff, 1, 3, 1.5, { x: -210, y: -42, z: -254 });

// ADD TO SCENE
scene.background = createBackground();
scene.add(plane);
scene.add(planeGrid);
scene.add(planeFlat);
scene.add(planeFlatGrid);
scene.add(torus);

scene.add(sphere1);
scene.add(sphere2);
scene.add(sphere3);
scene.add(sphere4);
scene.add(sphere5);
scene.add(sphere6);

scene.add(pLight1);
scene.add(pLight2);
scene.add(pLight3);
scene.add(pLight4);
scene.add(pLight5);
scene.add(pLight6);

scene.add(aLight1);
// scene.add(rLight1); // Not needed with PlaneFlat. Might replace
scene.add(torusLight);

// MOVEMENTS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
movments(camera, controls, sphere1, sphere2, sphere3, sphere4, sphere5, sphere6);


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
  const lightFolder1 = gui.addFolder('Light 3');
  const light1Color = { color: 0xffffff };
  lightFolder1.add(light1, 'intensity').min(0).max(10).step(0.01);
  lightFolder1.add(light1, 'distance').min(0).max(1000).step(0.5);
  lightFolder1.add(light1, 'decay').min(1).max(10).step(0.5);
  lightFolder1.add(light1.position, 'x').min(-1000).max(1000).step(0.1);
  lightFolder1.add(light1.position, 'y').min(-1000).max(1000).step(0.1);
  lightFolder1.add(light1.position, 'z').min(-1000).max(1000).step(0.1);
  lightFolder1.addColor(light1Color, 'color').onChange(() => {
    light1.color.set(light1Color.color)
  });
  const lightFolder2 = gui.addFolder('Light 5');
  const light2Color = { color: 0xffffff };
  lightFolder2.add(light2, 'intensity').min(0).max(10).step(0.01);
  lightFolder2.add(light2, 'distance').min(0).max(1000).step(0.5);
  lightFolder2.add(light2, 'decay').min(1).max(10).step(0.5);
  lightFolder2.add(light2.position, 'x').min(-1000).max(1000).step(0.1);
  lightFolder2.add(light2.position, 'y').min(-1000).max(1000).step(0.1);
  lightFolder2.add(light2.position, 'z').min(-1000).max(1000).step(0.1);
  lightFolder2.addColor(light2Color, 'color').onChange(() => {
    light2.color.set(light2Color.color)
  });
  const lightFolder3 = gui.addFolder('Light 6');
  const light3Color = { color: 0xffffff };
  lightFolder3.add(light3, 'intensity').min(0).max(10).step(0.01);
  lightFolder3.add(light3, 'distance').min(0).max(1000).step(0.5);
  lightFolder3.add(light3, 'decay').min(1).max(10).step(0.5);
  lightFolder3.add(light3.position, 'x').min(-1000).max(1000).step(0.1);
  lightFolder3.add(light3.position, 'y').min(-1000).max(1000).step(0.1);
  lightFolder3.add(light3.position, 'z').min(-1000).max(1000).step(0.1);
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

// Testing location finder
window.addEventListener("click", clicking, false);
function clicking() {
  console.log("x " + camera.position.x);
  console.log("y " + camera.position.y);
  console.log("z " + camera.position.z);
};

// lightDebugHelper(pLight3, pLight5, pLight6); // Comment/Uncomment to toggle debug mode
// DEBUG ** DEVELOPMENT USE ONLY ** DEBUG //

animate();
