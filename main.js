import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js' // temp
import * as dat from 'dat.gui' // temp

// DEBUG 
const gui = new dat.GUI(); // temp

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(50);

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// BACKGROUND
const spaceTexture = new THREE.TextureLoader().load('./images/space.jpg');
scene.background = spaceTexture;

// OBJECTS
// Torus
const torus_geo = new THREE.TorusGeometry(13, 2, 30, 8);
const torus_mat = new THREE.MeshStandardMaterial({ color: 0x9B00E8 });
const torus = new THREE.Mesh(torus_geo, torus_mat);

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
scene.add(torus);

// ANIMATE
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// RESIZING WINDOW
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

animate();