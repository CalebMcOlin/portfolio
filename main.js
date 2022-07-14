import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createAmbientLight, createPointLight } from './src/lights';
import { createSphere, createPlane, createBackground } from './src/objects';
// import { moveToFirst, moveToSecond } from './src/movements';
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
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio, 2);

// CAMERA
export const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000);
camera.position.x = 5;

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
const plane = createPlane(1000, 1000, 70, 70, 0x292929, 1, 0.2, '/images/plane-displacement-map.jpg', 110, -55, { x: 0, y: -5, z: 0 });
const sphere1 = createSphere("Sphere 1", 0.5, 0x292929, 1, 0.2, './images/sphere-normal-map.jpg', { x: 0, y: 0, z: 0 });
const sphere2 = createSphere("Sphere 1", 0.5, 0x292929, 1, 0.2, './images/sphere-normal-map.jpg', { x: 134.5, y: -28.2, z: -103.6 });
const pLight1 = createPointLight(0x8709b5, 5, { x: 4, y: 3.89, z: -6.34 });
const pLight2 = createPointLight(0xe0a919, 6.5, { x: -3.06, y: -3.28, z: -4.57 });
const pLight3 = createPointLight(0xffffff, 0.2, { x: 2.3, y: 0, z: 5.5 });
const aLight1 = createAmbientLight(0xffffff, 0.5)

// ADD TO SCENE
scene.background = createBackground();
scene.add(plane);
scene.add(sphere1);
scene.add(sphere2);
scene.add(pLight1);
scene.add(pLight2);
scene.add(pLight3);
scene.add(aLight1);


// MOVEMENTS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
document.getElementById('fw-btn').addEventListener("click", (event) => { moveToSphere(sphere2, event); }, false);
document.getElementById('bk-btn').addEventListener("click", (event) => { moveToSphere(sphere1, event); }, false);

function moveToSphere(target) {
  gsap.to(camera.position, {
    x: target.position.x + 7,
    duration: 2
  })
  gsap.to(camera.position, {
    y: target.position.y - 2,
    duration: 2
  })
  gsap.to(camera.position, {
    z: target.position.z - 5,
    duration: 2
  })
};


// ANIMATE LOOP
function animate() {
  // sphere1.rotation.y -= 0.01;
  // sphere2.rotation.y += 0.01;
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
  lightFolder1.add(light1.position, 'x').min(-5).max(5).step(0.01);
  lightFolder1.add(light1.position, 'y').min(-5).max(5).step(0.01);
  lightFolder1.add(light1.position, 'z').min(-10).max(10).step(0.01);
  lightFolder1.add(light1, 'intensity').min(0).max(10).step(0.01);
  const light1Color = { color: 0xffffff };
  lightFolder1.addColor(light1Color, 'color').onChange(() => {
    light1.color.set(light1Color.color)
  });
  const lightFolder2 = gui.addFolder('Light 2');
  lightFolder2.add(light2.position, 'x').min(-5).max(5).step(0.01);
  lightFolder2.add(light2.position, 'y').min(-5).max(5).step(0.01);
  lightFolder2.add(light2.position, 'z').min(-10).max(10).step(0.01);
  lightFolder2.add(light2, 'intensity').min(0).max(10).step(0.01);
  const light2Color = { color: 0xffffff };
  lightFolder2.addColor(light2Color, 'color').onChange(() => {
    light2.color.set(light2Color.color)
  });
  const lightFolder3 = gui.addFolder('Light 3');
  lightFolder3.add(light3.position, 'x').min(-5).max(5).step(0.01);
  lightFolder3.add(light3.position, 'y').min(-5).max(5).step(0.01);
  lightFolder3.add(light3.position, 'z').min(-10).max(10).step(0.01);
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
