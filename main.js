import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {
  createAmbientLight,
  createPointLight,
  createRectLight
} from './src/lights';
import {
  createSphere,
  createPlane,
  createBackground,
  createTorus,
  createChildSphere,
  createPatentObject,
  createOctahedron,
  createTorusKnot,
  createCone,
  createIcosahedron
} from './src/objects';
import { movement } from './src/movement';
import * as TWEEN from '@tweenjs/tween.js';
import { cycleWords } from './src/functions';
import planeHightmap from './res/plane-heightmap.png';
import sphereNormalmap from './res/sphere-normal-map.jpg';

// SCENE
export const scene = new THREE.Scene();
cycleWords(); // Start word animation

// RENDERER
const sizes = {
  width: document.body.offsetWidth,
  height: document.body.offsetHeight
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
camera.position.set(-23.46, -23.46, -23.46); // Sphere1 Location

// RESIZING
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  // Update sizes
  sizes.width = document.body.offsetWidth;
  sizes.height = document.body.offsetHeight;
  document.body.offsetHeight;
  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio, 2);
}

// SCENE OBJECTS
// Foundation
scene.background = createBackground();
const plane = createPlane(1000, 1000, 100, 100, 0x292929, 0.5, 0.5, planeHightmap, 110, -55, { x: 0, y: -5, z: 0 }, false);
const planeGrid = createPlane(1000, 1000, 100, 100, 0x290CFF, 0, 0, planeHightmap, 110, -55, { x: 0, y: -5, z: 0 }, true);
const planeFlat = createPlane(1000, 1000, 1, 1, 0x000000, 0, 0, '', 0, 0, { x: 0, y: -59.5, z: 0 }, false);
const planeFlatGrid = createPlane(1000, 1000, 100, 100, 0xFF019A, 0, 0, '', 0, 0, { x: -59.5, y: -59, z: 0 }, true);
const torus = createTorus("Torus", 35, 2, 20, 64, 0xfff000, 0.5, 0.5, { x: 108, y: 40, z: 38 });
const aLight1 = createAmbientLight(0xffffff, .6);
// const rLight1 = createRectLight(0x9700CC, 1000, 1000, 1, { x: 0, y: -59.9, z: 0 }, { x: 0, y: -100, z: 0 }); // Not needed with PlaneFlat. Might replace
const torusLight = createPointLight(0xfff000, 2.8, 85, 2.5, { x: 112, y: 51, z: 37 });
scene.add(plane);
scene.add(planeGrid);
scene.add(planeFlat);
scene.add(planeFlatGrid);
scene.add(torus);
scene.add(aLight1);
// scene.add(rLight1); // Not needed with PlaneFlat. Might replace
scene.add(torusLight);

// Slide 1 object(s)
const pLight1 = createPointLight(0xffffff, 3, 6, 1, { x: -23.5, y: -20, z: -20 });
const slide1Sphere = createSphere("Sphere 1", 0.5, 0xFF10F0, .4, .5, sphereNormalmap, { x: -20, y: -20, z: -20 });
const slide1Child1 = createChildSphere("Sphere Child 1", 0.1, 0xFF3131, .4, .5, sphereNormalmap);
const slide1Child1Parent = createPatentObject(slide1Sphere.position);
const slide1Child2 = createChildSphere("Sphere Child 2", 0.2, 0x39FF14, .4, .5, sphereNormalmap);
const slide1Child2Parent = createPatentObject(slide1Sphere.position);
const slide1Child3 = createChildSphere("Sphere Child 3", 0.2, 0x1F51FF, .4, .5, sphereNormalmap);
const slide1Child3Parent = createPatentObject(slide1Sphere.position);
scene.add(pLight1);
scene.add(slide1Sphere);
scene.add(slide1Child1Parent);
scene.add(slide1Child2Parent);
scene.add(slide1Child3Parent);
slide1Child1Parent.add(slide1Child1);
slide1Child2Parent.add(slide1Child2);
slide1Child3Parent.add(slide1Child3);
slide1Child1.position.x = 1;
slide1Child2.position.z = -1.5; // off center according to Z rather than X
slide1Child3.position.x = -2;

// Slide 2 object(s)
const pLight2 = createPointLight(0xffffff, 1.5, 5, 1, { x: -182, y: 42, z: -32 });
const slide2Octahedron = createOctahedron("Octahedron 1", 1.3, 0, 0x000000, 0, 0, '', { x: -180, y: 40, z: -30 }, false);
const slide2OctahedronWire = createOctahedron("Octahedron 1 Wire", 1.3, 0, 0xFF019A, 0, 0, '', { x: -180, y: 40, z: -30 }, true);
scene.add(pLight2);
scene.add(slide2Octahedron);
scene.add(slide2OctahedronWire);

// Slide 3 object(s)
const pLight3 = createPointLight(0xffffff, 2, 8, 1.5, { x: -201, y: 11.4, z: 26.8 });
const slide3Cone1 = createCone("Cone 3-1", 1, 1.4, 4, 1, 0x00000, .4, .5, sphereNormalmap, false);
const slide3Cone1Wire = createCone("Cone 3-1 Wire", 1, 1.4, 4, 1, 0xFF019A, 0, 0, sphereNormalmap, true);
const slide3Cone2 = createCone("Cone 3-2", 1, 1.4, 4, 1, 0x00000, .4, .5, sphereNormalmap, false);
const slide3Cone2Wire = createCone("Cone 3-2 Wire", 1, 1.4, 4, 1, 0xFF019A, 0, 0, sphereNormalmap, true);
slide3Cone1.position.set(-200, 10.8, 27);
slide3Cone2.position.set(-200, 9.2, 27);
slide3Cone2.rotation.x = (Math.PI);
slide3Cone1.add(slide3Cone1Wire);
slide3Cone2.add(slide3Cone2Wire);
scene.add(slide3Cone1);
scene.add(slide3Cone2);
scene.add(pLight3);

// Slide 3 animation using Tween
const slide3Cone1Tween1 = new TWEEN.Tween({ y: 10.8, yRotation: 0 })
  .to({ y: 11.6, yRotation: Math.PI }, 2000)
  .onUpdate((cords) => {
    slide3Cone1.position.y = cords.y;
    slide3Cone1.rotation.y = cords.yRotation;
  })
  .easing(TWEEN.Easing.Quadratic.InOut)
  .delay(500);
const slide3Cone1Tween2 = new TWEEN.Tween({ y: 11.6, yRotation: Math.PI })
  .to({ y: 10.8, yRotation: Math.PI * 2 }, 2000)
  .onUpdate((cords) => {
    slide3Cone1.position.y = cords.y;
    slide3Cone1.rotation.y = cords.yRotation;
  })
  .easing(TWEEN.Easing.Quadratic.InOut);
slide3Cone1Tween1.chain(slide3Cone1Tween2);
slide3Cone1Tween2.chain(slide3Cone1Tween1);
slide3Cone1Tween1.start();
// Slide 3 animation using Tween
const slide3Cone2Tween1 = new TWEEN.Tween({ y: 9.2, yRotation: 0 })
  .to({ y: 8.6, yRotation: Math.PI }, 2000)
  .onUpdate((cords) => {
    slide3Cone2.position.y = cords.y;
    slide3Cone2.rotation.y = cords.yRotation;
  })
  .easing(TWEEN.Easing.Quadratic.InOut)
  .delay(500);
const slide3Cone2Tween2 = new TWEEN.Tween({ y: 8.6, yRotation: Math.PI })
  .to({ y: 9.2, yRotation: Math.PI * 2 }, 2000)
  .onUpdate((cords) => {
    slide3Cone2.position.y = cords.y;
    slide3Cone2.rotation.y = cords.yRotation;
  })
  .easing(TWEEN.Easing.Quadratic.InOut);
slide3Cone2Tween1.chain(slide3Cone2Tween2);
slide3Cone2Tween2.chain(slide3Cone2Tween1);
slide3Cone2Tween1.start();

// Slide 4 object(s)
const pLight4 = createPointLight(0xffffff, 2, 4.5, 1, { x: 93, y: -30, z: 187 });
const torusKnot = createTorusKnot("TorusKnot", 1, .2, 60, 12, 5, 4, 0x1F51FF, .4, .5, sphereNormalmap, { x: 96, y: -30, z: 186 });
let scalePerFrame = 0.003; // scale the capsule up and down
scene.add(pLight4);
scene.add(torusKnot);

// Slide 5 object(s)
const pLight5 = createPointLight(0xffffff, 1, 10, 1, { x: 279, y: -38, z: -207.5 });
const slide5Icosahedron = createIcosahedron("Icosahedron 1", 1, 0x9D00FF, .4, .5, sphereNormalmap, { x: 277, y: -38, z: -205 }, false);
const slide5IcosahedronLeft = createIcosahedron("Icosahedron left", .4, 0x1F51FF, .4, .5, sphereNormalmap, { x: 279, y: -38, z: -203 }, false);
const slide5IcosahedronRight = createIcosahedron("Icosahedron right", .4, 0x1F51FF, .4, .5, sphereNormalmap, { x: 275, y: -38, z: -207 }, false);
scene.add(pLight5);
scene.add(slide5Icosahedron);
scene.add(slide5IcosahedronRight);
scene.add(slide5IcosahedronLeft);

// Slide 6 object(s)
const pLight6 = createPointLight(0xffffff, 1, 4, 1.5, { x: -209, y: -43, z: -253 });
const slide6ConeParent = createPatentObject({ x: -209, y: -43, z: -253 });
const slide6Cone1 = createCone("Cone 1", .5, 1.5, 6, 1, 0xFFFF00, .4, .5, sphereNormalmap, false);
const slide6Cone2 = createCone("Cone 2", .5, 1.5, 6, 1, 0x9D00FF, .4, .5, sphereNormalmap, false);
const slide6Cone3 = createCone("Cone 3", .5, 1.5, 6, 1, 0xFF3131, .4, .5, sphereNormalmap, false);
const slide6Cone4 = createCone("Cone 4", .5, 1.5, 6, 1, 0x1F51FF, .4, .5, sphereNormalmap, false);
slide6ConeParent.add(slide6Cone1);
slide6ConeParent.add(slide6Cone2);
slide6ConeParent.add(slide6Cone3);
slide6ConeParent.add(slide6Cone4);
slide6Cone1.position.y = -1.5;
slide6Cone2.position.y = 1.5;
slide6Cone2.rotation.x = (Math.PI);
slide6Cone3.position.z = 1.5;
slide6Cone3.rotation.x = (Math.PI / -2);
slide6Cone4.position.z = -1.5;
slide6Cone4.rotation.x = (Math.PI / 2);
scene.add(pLight6);
scene.add(slide6ConeParent);

// MOVEMENTS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
movement(camera, controls, slide1Sphere, slide2Octahedron, slide3Cone1, torusKnot, slide5Icosahedron, slide6ConeParent);

// ANIMATE LOOP
function animate(t) {
  // Slide 1 Animation
  slide1Sphere.rotation.y += 0.005;
  slide1Child1.rotation.y += -0.1;
  slide1Child2.rotation.y += -0.01;
  slide1Child3.rotation.z += 0.01;
  slide1Child1Parent.rotation.z += -.01;
  slide1Child1Parent.rotation.x += .01;
  slide1Child2Parent.rotation.y += .008;
  slide1Child2Parent.rotation.z += .009;
  slide1Child3Parent.rotation.y += -.006;

  // Slide 2 Animation
  slide2Octahedron.rotation.y = Math.sin(Date.now() * 0.001) * Math.PI * 0.5;
  slide2OctahedronWire.rotation.y = Math.sin(Date.now() * 0.001) * Math.PI * 0.5;

  // Slide 3 Animation
  // Slide 3 uses TWEEN for the animation. Check the Slide 3 object(s) above for animation code.

  // Slide 4 Animation
  torusKnot.rotation.z += -0.01;
  torusKnot.scale.y += scalePerFrame;
  torusKnot.scale.x += scalePerFrame;
  torusKnot.scale.z += scalePerFrame;
  if (torusKnot.scale.y >= 1.3) scalePerFrame = -0.003; // if too big, scale down
  if (torusKnot.scale.y <= 0.9) scalePerFrame = 0.003; // if too small, scale up

  // Slide 5 Animation
  slide5Icosahedron.rotation.z += .01
  slide5IcosahedronLeft.rotation.y += .015
  slide5IcosahedronRight.rotation.y += -.015

  // Slide 6 Animation
  slide6ConeParent.rotation.x += .005;
  slide6ConeParent.rotation.y += .005;
  slide6ConeParent.rotation.z += .005;

  // Main animation loop
  TWEEN.update(t);
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
};


// DEBUG ** DEVELOPMENT USE ONLY ** DEBUG //
// import * as dat from 'dat.gui';
// const gui = new dat.GUI();
function lightDebugHelper(light1, light2, light3) {
  // Helpers
  const lightHelper1 = new THREE.PointLightHelper(light1, 0.5);
  const lightHelper2 = new THREE.PointLightHelper(light2, 0.5);
  const lightHelper3 = new THREE.PointLightHelper(light3, 0.5);
  scene.add(lightHelper1);
  scene.add(lightHelper2);
  scene.add(lightHelper3);

  // GUI interface
  const lightFolder1 = gui.addFolder('Light 4');
  const light1Color = { color: 0xffffff };
  lightFolder1.add(light1, 'intensity').min(0).max(10).step(0.01);
  lightFolder1.add(light1, 'distance').min(0).max(7).step(0.5);
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

  // Testing location finder
  window.addEventListener("click", clicking, false);
  function clicking() {
    console.log("x " + camera.position.x);
    console.log("y " + camera.position.y);
    console.log("z " + camera.position.z);
  };
};
// lightDebugHelper(pLight4, pLight5, pLight6); // Comment/Uncomment to toggle debug mode
// DEBUG ** DEVELOPMENT USE ONLY ** DEBUG //

animate();
