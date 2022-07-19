import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

/** Creates a Sphere Object3D with the given properties .
 * 
 * @param {String} name `String`: The name of the sphere
 * @param {float} rad `float`: The radius of the sphere.
 * @param {color} col `color`: 0x000000
 * @param {float} met `float`: The metalness of the sphere. - '0 > 1'
 * @param {float} rou `float`: The roughness of the sphere. - '0 > 1'
 * @param {String} norm `string`: The directory path to the normal map.
 * @param {Object} pos `Object`: [x: #, y: #, z: #] cordinates for the sphere.
 */
export function createSphere(name,rad, col, met, rou, normal, pos) {
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
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.position.set(pos.x, pos.y, pos.z);
    return sphere;
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
 */
export function createPlane(width, height, widthSegments, heightSegments, col, met, rou, dis_map, dis_scale, dis_bias, pos, isWireframe) {
    const plane_geo = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    const plane_height = textureLoader.load('' + dis_map);
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
    const spaceTexture = textureLoader.load('./images/space.jpg');
    return spaceTexture;
};