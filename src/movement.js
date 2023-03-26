// import './style.css';
import * as THREE from 'three';
import { gsap } from "gsap";

export function movement(camera, controls, sphere1, sphere2, sphere3, sphere4, sphere5, sphere6) {

  let slideIndex = 1;
  // Final locations for the camera at each slide
  // Currently only the "x" is used. But "y" and "z" are marked if needed later in devlopment
  let homeLoc = { x: -23, y: -23, z: -23 };
  let intern1Loc = { x: -186, y: 41, z: -31 };
  let intern2Loc = { x: -205, y: 10, z: 30 };
  let articleLoc = { x: 93, y: -32, z: 190 };
  let websiteLoc = { x: 281, y: -38, z: -209 };
  let constactLoc = { x: -212, y: -43, z: -258 };

  // ONLICKS
  document.getElementById('btn-1').addEventListener("click", (event) => { moveToSlide1(event) }, false);
  document.getElementById('btn-2').addEventListener("click", (event) => { moveToSlide2(event) }, false);
  document.getElementById('btn-3').addEventListener("click", (event) => { moveToSlide3(event) }, false);
  document.getElementById('btn-4').addEventListener("click", (event) => { moveToSlide4(event) }, false);
  document.getElementById('btn-5').addEventListener("click", (event) => { moveToSlide5(event) }, false);
  document.getElementById('btn-6').addEventListener("click", (event) => { moveToSlide6(event) }, false);
  document.getElementById('btn-L').addEventListener("click", (event) => { leftClick(event); }, false);
  document.getElementById('btn-R').addEventListener("click", (event) => { rightClick(event); }, false);

  // Each object's move funtions
  function moveToSlide1() {
    move(sphere1, { x: 0, y: 0, z: 0 }, 6, "home");
    slideIndex = 1;
    document.getElementById("btn-1").style.backgroundColor = "#7A287C";
    showSlidesDisply('home', homeLoc.x);
  };

  function moveToSlide2() {
    move(sphere2, { x: 0, y: 0, z: 0 }, 6, "intern1");
    slideIndex = 2;
    document.getElementById("btn-2").style.backgroundColor = "#7A287C";
    showSlidesDisply('intern1', intern1Loc.x);
  };

  function moveToSlide3() {
    // The `targetPos` need to be custom and static here here because the target is moving will mess up the camera location
    move({ position: { x: -200, y: 10, z: 27 } }, { x: -30, y: 0, z: -90 }, 6, "intern2");
    slideIndex = 3;
    document.getElementById("btn-3").style.backgroundColor = "#7A287C";
    showSlidesDisply('intern2', intern2Loc.x);
  };

  function moveToSlide4() {
    move(sphere4, { x: 216, y: 50, z: 31 }, 6, "article");
    slideIndex = 4;
    document.getElementById("btn-4").style.backgroundColor = "#7A287C";
    showSlidesDisply('article', articleLoc.x);
  };

  function moveToSlide5() {
    move(sphere5, { x: -203, y: 0, z: 275 }, 6, "website");
    slideIndex = 5;
    document.getElementById("btn-5").style.backgroundColor = "#7A287C";
    showSlidesDisply('website', websiteLoc.x);
  };

  function moveToSlide6() {
    move(sphere6, { x: 30, y: -30, z: 100 }, 6, "contact");
    slideIndex = 6;
    document.getElementById("btn-6").style.backgroundColor = "#7A287C";
    showSlidesDisply('contact', constactLoc.x);
  };

  // Moves the slides back by one (Slide 1 loops to Slide 6)
  function leftClick() {
    switch (slideIndex) {
      case 1:
        moveToSlide6();
        break;
      case 2:
        moveToSlide1();
        break;
      case 3:
        moveToSlide2();
        break;
      case 4:
        moveToSlide3();
        break;
      case 5:
        moveToSlide4();
        break;
      case 6:
        moveToSlide5();
        break;
    };
  };

  // Moves the slides forward by one (Slide 6 loops to Slide 1)
  function rightClick() {
    switch (slideIndex) {
      case 1:
        moveToSlide2();
        break;
      case 2:
        moveToSlide3();
        break;
      case 3:
        moveToSlide4();
        break;
      case 4:
        moveToSlide5();
        break;
      case 5:
        moveToSlide6();
        break;
      case 6:
        moveToSlide1();
        break;
    };
  };

  //
  /**
   * Moves the camera to a view a Vector3 location. 
   * 
   * Calculates the Vector3 location for the camera given two seperate Vector3 and a distance to the closest Vector3.
   * 
   * @param {Vector3} targetPos Vector3 repersenting the target location.
   * @param {Vector3} focalPos Vector3 repersenting the focal location for the camera. (What the camera is looking at).
   * @param {number} distFrom The distance the camera is from the target.
   */
  function move(targetPos, focalPos, distFrom) {

    // Hide all slides before camera moves
    hideSlidesDisplay();
    // Reset all nav button colors
    resetNavColor();

    // Setting up for vector and postion caculation
    const cameraLoc = new THREE.Vector3(); // Camera's position behind the target
    const dir = new THREE.Vector3(); // The vector between the center of 3D map and target.
    const unitsFromTarget = distFrom; // units camera is from the target
    const focalLoc = new THREE.Vector3(focalPos.x, focalPos.y, focalPos.z); // focal point behind the target (set at center of 3D map)
    const targetLoc = targetPos.position; // Target's position

    // Caclating the position of the camera behing the targets location on the same vector as the target and center of 3D map
    cameraLoc.addVectors(targetLoc, dir.subVectors(targetLoc, focalLoc).normalize().multiplyScalar(unitsFromTarget));

    // Animate movement/position of camera
    gsap.to(camera.position, {
      x: cameraLoc.x,
      y: cameraLoc.y,
      z: cameraLoc.z,
      duration: 4
    });

    // Animate aim of camera
    gsap.to(controls.target, {
      x: focalLoc.x,
      y: focalLoc.y,
      z: focalLoc.z,
      duration: 4
    });
  };

  // Change all Nav Buttons back to the unselected state
  function resetNavColor() {
    let elements = document.getElementsByClassName("navBarBtn"); // get all elements
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = "transparent";
    };
  };

  /** Sets all Slides to display: none
   */
  function hideSlidesDisplay() {
    let elements = document.getElementsByClassName("slides"); // get all elements
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    };
  };

  /** Show the slide IF the camera reaches a certain location with in the given time
   * 
   * @param {*} currentSlide the slide id that needs to show
   * @param {*} x The "x" location the camera need to be located for the slide to show
   */
  function showSlidesDisply(currentSlide, x) {
    setTimeout(() => {
      hideSlidesDisplay();
      if (Math.round(camera.position.x) == Math.round(x)) {
        document.getElementById(currentSlide).style.display = 'block';
      }
    }, 4500);
  };

  moveToSlide1(); //Start on the first slide
};