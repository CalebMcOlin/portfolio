import * as THREE from 'three';
import bg from '../res/space-bg.jpg';

const textureLoader = new THREE.TextureLoader();

/** Creates a Sphere Object3D with the given properties.
 * 
 * @param {String} name `String`: The name of the sphere
 * @param {float} rad `float`: The radius of the sphere.
 * @param {color} col `color`: 0x000000
 * @param {float} met `float`: The metalness of the sphere. - '0 > 1'
 * @param {float} rou `float`: The roughness of the sphere. - '0 > 1'
 * @param {String} norm `string`: The directory path to the normal map.
 * @param {Object} pos `Object`: [x: #, y: #, z: #] cordinates for the sphere.
 * @returns the created `Sphere`
 */
export function createSphere(name, rad, col, met, rou, normal, pos) {
  const sphere_geo = new THREE.SphereGeometry(rad, 64, 64);
  const sphere_normal = textureLoader.load('' + normal);
  const sphere_mat = new THREE.MeshStandardMaterial({
    name: name,
    color: col,
    metalness: met,
    roughness: rou,
    normalMap: sphere_normal
  });
  const sphere = new THREE.Mesh(sphere_geo, sphere_mat);
  // sphere.castShadow = true;
  // sphere.receiveShadow = true;
  sphere.position.set(pos.x, pos.y, pos.z);
  return sphere;
};

/** Creates a Child Sphere Object3D with the given properties. 
 * This Shpere is not given a position becasue it is added to a parent Object3D and not directly to the scene.
 * 
 * @param {String} name `String`: The name of the sphere
 * @param {float} rad `float`: The radius of the sphere.
 * @param {color} col `color`: 0x000000
 * @param {float} met `float`: The metalness of the sphere. - '0 > 1'
 * @param {float} rou `float`: The roughness of the sphere. - '0 > 1'
 * @param {String} norm `string`: The directory path to the normal map.
 * @returns the created `Sphere`
 */
export function createChildSphere(name, rad, col, met, rou, normal) {
  const sphere_geo = new THREE.SphereGeometry(rad, 64, 64);
  const sphere_normal = textureLoader.load('' + normal);
  const sphere_mat = new THREE.MeshStandardMaterial({
    name: name,
    color: col,
    metalness: met,
    roughness: rou,
    normalMap: sphere_normal
  });
  const sphere = new THREE.Mesh(sphere_geo, sphere_mat);
  // sphere.castShadow = true;
  // sphere.receiveShadow = true;
  return sphere;
};

/** Creates a parent Object3D at the given location.
 * 
 * @param {Object} pos `Object`: [x: #, y: #, z: #] cordinates for the parent object's position.

 * @returns The invisible object used to connect a child to. 
 */
export function createPatentObject(pos) {
  const parent = new THREE.Object3D();
  parent.position.set(pos.x, pos.y, pos.z);
  return parent;
};

/** Creates a Octahedron Object3D with the given properties.
 * 
 * @param {String} name `String`: The name of the octahedron
 * @param {float} rad `float`: The radius of the octahedron.
 * @param {number} det `number`: The level of detail of the octahedron.
 * @param {color} col `color`: 0x000000
 * @param {float} met `float`: The metalness of the octahedron. - '0 > 1'
 * @param {float} rou `float`: The roughness of the octahedron. - '0 > 1'
 * @param {String} norm `string`: The directory path to the normal map.
 * @param {Object} pos `Object`: [x: #, y: #, z: #] cordinates for the octahedron.
 * @returns the created `Octahedron`
 */
export function createOctahedron(name, rad, det, col, met, rou, normal, pos, isWireframe) {
  const octahedron_geo = new THREE.OctahedronGeometry(rad, det);
  const octahedron_normal = textureLoader.load('' + normal);
  const octahedron_mat = new THREE.MeshStandardMaterial({
    name: name,
    color: col,
    metalness: met,
    roughness: rou,
    normalMap: octahedron_normal,
    wireframe: isWireframe
  });
  const octahedron = new THREE.Mesh(octahedron_geo, octahedron_mat);
  // octahedron.castShadow = true;
  // octahedron.receiveShadow = true;
  octahedron.position.set(pos.x, pos.y, pos.z);
  return octahedron;
};

/** Creates a Icosahedron Object3D with the given properties.
 * 
 * @param {String} name `String`: The name of the icosahedron
 * @param {float} rad `float`: The radius of the icosahedron.
 * @param {color} col `color`: 0x000000
 * @param {float} met `float`: The metalness of the icosahedron. - '0 > 1'
 * @param {float} rou `float`: The roughness of the icosahedron. - '0 > 1'
 * @param {String} norm `string`: The directory path to the normal map.
 * @param {Object} pos `Object`: [x: #, y: #, z: #] cordinates for the icosahedron.
 * @returns the created `icosahedron`
 */
export function createIcosahedron(name, rad, col, met, rou, normal, pos, isWireframe) {
  const icosahedron_geo = new THREE.IcosahedronGeometry(rad, 0);
  const icosahedron_normal = textureLoader.load('' + normal);
  const icosahedron_mat = new THREE.MeshStandardMaterial({
    name: name,
    color: col,
    metalness: met,
    roughness: rou,
    normalMap: icosahedron_normal,
    wireframe: isWireframe
  });
  const icosahedron = new THREE.Mesh(icosahedron_geo, icosahedron_mat);
  // icosahedron.castShadow = true;
  // icosahedron.receiveShadow = true;
  icosahedron.position.set(pos.x, pos.y, pos.z);
  return icosahedron;
};

/** Creates a Torus Object3D with the given properties.
 * 
 * @param {String} name `String`: The name of the Torus
 * @param {float} rad `float`: The radius of the Torus.
 * @param {number} thick thickness of the Torus
 * @param {float} radSeg number of radius segments 
 * @param {float} thickSeg number of thickness segments
 * @param {color} col `color`: 0x000000
 * @param {float} met `float`: The metalness of the Torus. - '0 > 1'
 * @param {float} rou `float`: The roughness of the Torus. - '0 > 1'
 * @param {Object} pos `Object`: [x: #, y: #, z: #] cordinates for the Torus.
 * @returns the created `Trous`
 */
export function createTorus(name, rad, thick, radSeg, thickSeg, col, met, rou, pos) {
  const torus_geo = new THREE.TorusGeometry(rad, thick, radSeg, thickSeg);
  const torus_mat = new THREE.MeshBasicMaterial({
    name: name,
    color: col,
  });
  const torus = new THREE.Mesh(torus_geo, torus_mat);
  // torus.castShadow = true;
  // torus.receiveShadow = true;
  torus.position.set(pos.x, pos.y, pos.z);
  torus.rotation.x = (Math.PI / -2); // Allows the torus to lay down horizontally 
  return torus;
};

/** Creates a TorusKnot Object3D with the given properties.
 * 
 * @param {String} name `String`: The name of the TrousKnot
 * @param {float} rad `float`: The radius of the TrousKnot.
 * @param {number} thick thickness of the TrousKnot
 * @param {float} radSeg number of radius segments 
 * @param {float} thickSeg number of thickness segments
 * @param {number} p `number`: determines how many times the geometry winds around its axis of rotational symmetry. (Default is 2)
 * @param {number} q `number`: determines how many times the geometry winds around a circle in the interior of the torus. (Default is 3)
 * @param {color} col `color`: 0x000000
 * @param {float} met `float`: The metalness of the Torus. - '0 > 1'
 * @param {float} rou `float`: The roughness of the Torus. - '0 > 1'
 * @param {Object} pos `Object`: [x: #, y: #, z: #] cordinates for the TrousKnot.
 * @returns the created `TrousKnot`
 */
export function createTorusKnot(name, rad, thick, thickSeg, radSeg, p, q, col, met, rou, normal, pos) {
  const torusKnot_geo = new THREE.TorusKnotGeometry(rad, thick, thickSeg, radSeg, p, q);
  const torusKnot_normal = textureLoader.load('' + normal);
  const torusKnot_mat = new THREE.MeshStandardMaterial({
    name: name,
    color: col,
    metalness: met,
    roughness: rou,
    normalMap: torusKnot_normal
  });
  const torusKnot = new THREE.Mesh(torusKnot_geo, torusKnot_mat);
  // torus.castShadow = true;
  // torus.receiveShadow = true;
  torusKnot.position.set(pos.x, pos.y, pos.z);
  torusKnot.rotation.y = -1;
  return torusKnot;
};

/** Creates a cone Object3D with the given properties.
 * 
 * @param {String} name `String`: The name of the Cone
 * @param {float} rad `float`: The radius of the Cone. (Default is 1)
 * @param {float} height `float`: height of the Cone. (Default is 1)
 * @param {number} radSeg `number`: number of segmented faces around the circumference of the cone. (Default is 8)
 * @param {number} heightSeg `number`: number of rows of faces along the height of the cone. (Default is 10)
 */
export function createCone(name, rad, height, radSeg, heightSeg, col, met, rou, normal, isWireframe) {
  const cone_geo = new THREE.ConeGeometry(rad, height, radSeg, heightSeg);
  const cone_normal = textureLoader.load('' + normal);
  const cone_mat = new THREE.MeshStandardMaterial({
    name: name,
    color: col,
    metalness: met,
    roughness: rou,
    normalMap: cone_normal,
    wireframe: isWireframe
  });
  const cone = new THREE.Mesh(cone_geo, cone_mat);
  // cone.castShadow = true;
  // cone.receiveShadow = true;
  return cone;
};

/** Creates a Plane Object3D with the given properties.
 * 
 * @param {number} width `number`: Width of the sides on the X axis.
 * @param {number} height `number`: Height of the sides on the Y axis
 * @param {number} widthSegments `number`: Number of width segments
 * @param {number} heightSegments `number`: Number of height segments
 * @param {color} col `color`: 0x000000
 * @param {float} met `float`: The metalness of the sphere. - '0 > 1'
 * @param {float} rou `float`: The roughness of the sphere. - '0 > 1'
 * @param {String} dis_map `number`: `string`: The directory path to the displacement map.
 * @param {number} dis_scale `number`: Changes the scale of the displacement
 * @param {number} dis_bias `number`: Changes the bias of the displacement
 * @param {Object} pos `Object`: [x: #, y: #, z: #] cordinates for the plane.
 * @param {boolean} isWireframe `boolean`: Determines if the plane is a wireframe or not.
 * @returns the created `Plane`
 */
export function createPlane(width, height, widthSegments, heightSegments, col, met, rou, dis_map, dis_scale, dis_bias, pos, isWireframe) {
  const plane_geo = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
  let plane_height;
  if (dis_map === '') {
    plane_height = false;
  } else {
    plane_height = textureLoader.load('' + dis_map);
  }
  const plane_mat = new THREE.MeshStandardMaterial({
    color: col,
    metalness: met,
    roughness: rou,
    displacementMap: plane_height,
    displacementScale: dis_scale,
    displacementBias: dis_bias,
    wireframe: isWireframe
  });
  const plane = new THREE.Mesh(plane_geo, plane_mat);
  plane.rotation.x = (Math.PI / -2);
  plane.position.y = pos.y;
  return plane;
};

/** Loads and creates a background for the scene
 * 
 */
export function createBackground() {
  const spaceTexture = textureLoader.load(bg);
  return spaceTexture;
};