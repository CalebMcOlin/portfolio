import './style.css'
import * as THREE from 'three';
import { gsap } from "gsap";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' // temp
// import * as dat from 'dat.gui' // temp

// DEBUG 
// const gui = new dat.GUI(); // temp

// LOADER
const textureLoader = new THREE.TextureLoader();

// SCENE
const scene = new THREE.Scene();

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

// CAMERA
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000);
camera.position.x = 5;

// BACKGROUND
const spaceTexture = new THREE.TextureLoader().load('./images/space.jpg');
scene.background = spaceTexture;

// OBJECTS
// plane
const plane_geo = new THREE.PlaneGeometry(1000, 1000, 70, 70);
const plane_height = textureLoader.load('/images/plane-displacement-map.jpg');
const plane_mat = new THREE.MeshStandardMaterial({
  color: 0x292929,
  // metalness: 1,
  roughness: 0.2,
  displacementMap: plane_height,
  displacementScale: 110,
  displacementBias: -55
});
const plane = new THREE.Mesh(plane_geo, plane_mat);
plane.rotation.x = (Math.PI / -2);
plane.position.y = -5;

// sphere
const sphere_geo = new THREE.SphereGeometry(1, 64, 64);
const sphere_normal = textureLoader.load('/images/sphere-normal-map.jpg');
const sphere_mat = new THREE.MeshStandardMaterial({
  color: 0x292929,
  metalness: 1,
  roughness: 0.2,
  normalMap: sphere_normal
});
const sphere = new THREE.Mesh(sphere_geo, sphere_mat);

const sphere2 = new THREE.Mesh(sphere_geo, sphere_mat); // temp
sphere2.position.set(134.5, -28.2, -103.6); //temp

// LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
const pointLight1 = new THREE.PointLight(0x8709b5, 5);
const pointLight2 = new THREE.PointLight(0xe0a919, 6.5);
const pointLight3 = new THREE.PointLight(0xffffff, 0.2)
pointLight1.position.set(4, 3.89, -6.34);
pointLight2.position.set(-3.06, -3.28, -4.57);
pointLight3.position.set(2.3, 0, 5.5);

// // helpers
// const lightHelper1 = new THREE.PointLightHelper(pointLight1, 0.5); // temp
// const lightHelper2 = new THREE.PointLightHelper(pointLight2, 0.5); // temp
// const lightHelper3 = new THREE.PointLightHelper(pointLight3, 0.5); // temp
// scene.add(lightHelper1) // temp
// scene.add(lightHelper2) // temp
// scene.add(lightHelper3) // temp
// // debug
// const light1 = gui.addFolder('Light 1'); // temp
// light1.add(pointLight1.position, 'x').min(-5).max(5).step(0.01); // temp
// light1.add(pointLight1.position, 'y').min(-5).max(5).step(0.01); // temp
// light1.add(pointLight1.position, 'z').min(-10).max(10).step(0.01); // temp
// light1.add(pointLight1, 'intensity').min(0).max(10).step(0.01); // temp
// const light1Color = { color: 0xffffff }; // temp
// light1.addColor(light1Color, 'color').onChange(() =>{
//   pointLight1.color.set(light1Color.color)
// }); // temp
// const light2 = gui.addFolder('Light 2'); // temp
// light2.add(pointLight2.position, 'x').min(-5).max(5).step(0.01); // temp
// light2.add(pointLight2.position, 'y').min(-5).max(5).step(0.01); // temp
// light2.add(pointLight2.position, 'z').min(-10).max(10).step(0.01); // temp
// light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01); // temp
// const light2Color = { color: 0xffffff }; // temp
// light2.addColor(light2Color, 'color').onChange(() =>{
//   pointLight2.color.set(light2Color.color)
// }); // temp
// const light3 = gui.addFolder('Light 3'); // temp
// light3.add(pointLight3.position, 'x').min(-5).max(5).step(0.01); // temp
// light3.add(pointLight3.position, 'y').min(-5).max(5).step(0.01); // temp
// light3.add(pointLight3.position, 'z').min(-10).max(10).step(0.01); // temp
// light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01); // temp
// const light3Color = { color: 0xffffff }; // temp
// light3.addColor(light3Color, 'color').onChange(() =>{ // temp
//   pointLight3.color.set(light3Color.color) // temp
// }); // temp

// locate camera
const controls = new OrbitControls(camera, renderer.domElement); // temp
controls.enableDamping = true; // temp
// window.addEventListener("click", clicking, false); // temp
// function clicking() { // temp
//   console.log("x " + camera.position.x); // temp
//   console.log("y " + camera.position.y); // temp
//   console.log("z " + camera.position.z); // temp
// } // temp



// Add OBJECTS and LIGHTS to SCENE
scene.add(ambientLight);
scene.add(pointLight1);
scene.add(pointLight2);
scene.add(pointLight3);
scene.add(plane);
scene.add(sphere);
scene.add(sphere2); // temp

// ANIMATE
function animate() {
  sphere.rotation.y -= 0.01;
  sphere2.rotation.y += 0.01; //temp
  renderer.render(scene, camera);
  controls.update(); // temp
  requestAnimationFrame(animate);
}

document.getElementById('fw-btn').addEventListener("click", moveForward, false);
document.getElementById('bk-btn').addEventListener("click", moveBack, false);
function moveForward() {
  gsap.to(camera.position, {
    x: sphere2.position.x + 7,
    duration: 2
  })
  gsap.to(camera.position, {
    y: sphere2.position.y - 2,
    duration: 2
  })
  gsap.to(camera.position, {
    z: sphere2.position.z - 5,
    duration: 2
  })
}

function moveBack() {
  gsap.to(camera.position, {
    x: sphere.position.x + 5,
    duration: 2
  })
  gsap.to(camera.position, {
    y: sphere.position.y + 5,
    duration: 2
  })
  gsap.to(camera.position, {
    z: sphere.position.z + 5,
    duration: 2
  })
}

animate();