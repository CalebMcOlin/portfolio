import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' // temp
import * as dat from 'dat.gui' // temp

// DEBUG 
const gui = new dat.GUI(); // temp

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
camera.position.setZ(2);

// BACKGROUND
const spaceTexture = new THREE.TextureLoader().load('./images/space.jpg');
scene.background = spaceTexture;

// OBJECTS
// sphere
const sphere_geo = new THREE.SphereGeometry(0.5, 64, 64);
const sphere_normal = textureLoader.load('/images/sphere-normal-map.jpg');
const sphere_mat = new THREE.MeshStandardMaterial({
  color: 0x292929,
  metalness: 0.7,
  roughness: 0.2,
  normalMap: sphere_normal
});
const sphere = new THREE.Mesh(sphere_geo, sphere_mat);

// LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight1 = new THREE.PointLight(0xffffff, 1);
const pointLight2 = new THREE.PointLight(0xffffff, 1);
pointLight1.position.set(0, 0, 10);
pointLight2.position.set(0, 0, 0);

// const lightHelper1 = new THREE.PointLightHelper(pointLight1); // temp
// const lightHelper2 = new THREE.PointLightHelper(pointLight2); // temp
// scene.add(lightHelper1) // temp
// scene.add(lightHelper2) // temp

// Add OBJECTS and LIGHTS to SCENE
scene.add(pointLight1);
scene.add(pointLight2);
scene.add(ambientLight);
scene.add(sphere);

// ANIMATE
function animate() {
  sphere.rotation.y += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();