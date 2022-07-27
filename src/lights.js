import * as THREE from 'three';

/** Creates a single `AmbientLight` with the given properties.
 * 
 * @param {color} color Numeric value of the RGB component of the color or a Color instance.
 * @param {number} intensity Of the light
 * @returns The `AmbientLight`
 */
export function createAmbientLight(color, intensity) {
    const ambientLight = new THREE.AmbientLight(color, intensity);
    return ambientLight;
};

/** Creates a single `Pointlight` with the given properties.
 * 
 * @param {color} color Numeric value of the RGB component of the color or a Color instance.
 * @param {number} intensity Of the light
 * @param {Object} pos `Object`: [x: #, y: #, z: #] cordinates for the light.
 * @param {number} distance `number` Maximum range of the light. Default is 0 (no limit). 
 * @param {number} decay `number` The amount the light dims along the distance of the light. Default is 1
 * @returns The `PointLight`
 */
export function createPointLight(color, intensity, distance, decay, pos) {
    const pointLight = new THREE.PointLight(color, intensity, distance, decay);
    // pointLight.castShadow = true;
    pointLight.position.set(pos.x, pos.y, pos.z);
    return pointLight;
};

/** Creates a single `RectAreaLight` with the given properties.
 * 
 * @param {color} color Numeric value of the RGB component of the color or a Color instance.
 * @param {number} width Of the light
 * @param {number} height Of the light
 * @param {float} intensity Of the light
 * @param {Object} pos `Object`: [x: #, y: #, z: #] cordinates for the light.
 * @param {Object} look `Object`: [x: #, y: #, z: #] cordinates for the light look at.
 * @return The `RectAreaLight`
 */
export function createRectLight(color, width, height, intensity, pos, look) {
    const rectLight = new THREE.RectAreaLight(color, intensity, width, height);
    rectLight.position.set(pos.x, pos.y, pos.z);
    rectLight.lookAt(look.x, look.y, look.z);
    return rectLight;
}