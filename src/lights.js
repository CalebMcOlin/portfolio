import * as THREE from 'three';

/** Creates a single ambient light with the given properties.
 * 
 * @param {color} color Numeric value of the RGB component of the color or a Color instance.
 * @param {float} intensity Of the light '0 > 1'
 * @returns The AmbientLight
 */
export function createAmbientLight(color, intensity) {
    const ambientLight = new THREE.AmbientLight(color, intensity);
    return ambientLight;
};

/** Creates a single point light with the given properties.
 * 
 * @param {color} color 
 * @param {float} intensity 
 * @param {Object} pos `Object`: [x: #, y: #, z: #] cordinates for the light.
 * @returns The PointLight
 */
export function createPointLight(color, intensity, pos) {
    const pointLight = new THREE.PointLight(color, intensity);
    pointLight.position.set(pos.x, pos.y, pos.z);
    return pointLight;
};