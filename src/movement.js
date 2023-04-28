import * as THREE from 'three';
import { gsap } from "gsap";

export function movement(camera, controls, sphere1, sphere2, sphere3, sphere4, sphere5, sphere6) {
  let slideIndex = 1;

  // ONLICKS
  document.getElementById('btn-1').addEventListener("click", (event) => { moveToSlide("home", event) }, false);
  document.getElementById('btn-2').addEventListener("click", (event) => { moveToSlide("intern1", event) }, false);
  document.getElementById('btn-3').addEventListener("click", (event) => { moveToSlide("intern2", event) }, false);
  document.getElementById('btn-4').addEventListener("click", (event) => { moveToSlide("article", event) }, false);
  document.getElementById('btn-5').addEventListener("click", (event) => { moveToSlide("website", event) }, false);
  document.getElementById('btn-6').addEventListener("click", (event) => { moveToSlide("contact", event) }, false);
  document.getElementById('btn-L').addEventListener("click", (event) => { leftClick(event); }, false);
  document.getElementById('btn-R').addEventListener("click", (event) => { rightClick(event); }, false);

  /** Moves the camera to the given slide  
   * @param slide name of the slide in string form. (i.e. "home")   
   */
  function moveToSlide(slide) {
    switch (slide) {
      case "home":
        move(sphere1, { x: 0, y: 0, z: 0 }, 6);
        slideIndex = 1;
        document.getElementById("btn-1").style.backgroundColor = "#7A287C";
        break;
      case "intern1":
        move(sphere2, { x: 0, y: 0, z: 0 }, 6);
        slideIndex = 2;
        document.getElementById("btn-2").style.backgroundColor = "#7A287C";
        break;
      case "intern2":
        // The `targetPos` needs to be custom/static here, because the target is always moving meaning it will mess up the camera location
        move({ position: { x: -200, y: 10, z: 27 } }, { x: -30, y: 0, z: -90 }, 6);
        slideIndex = 3;
        document.getElementById("btn-3").style.backgroundColor = "#7A287C";
        break;
      case "article":
        move(sphere4, { x: 216, y: 50, z: 31 }, 6);
        slideIndex = 4;
        document.getElementById("btn-4").style.backgroundColor = "#7A287C";
        break;
      case "website":
        move(sphere5, { x: -203, y: 0, z: 275 }, 6);
        slideIndex = 5;
        document.getElementById("btn-5").style.backgroundColor = "#7A287C";
        break;
      case "contact":
        move(sphere6, { x: 30, y: -30, z: 100 }, 6);
        slideIndex = 6;
        document.getElementById("btn-6").style.backgroundColor = "#7A287C";
        break;
    }
  }

  /** Moves the slides back by one (Slide 1 loops to Slide 6) */
  function leftClick() {
    switch (slideIndex) {
      case 1:
        moveToSlide("contact");
        break;
      case 2:
        moveToSlide("home");
        break;
      case 3:
        moveToSlide("intern1");
        break;
      case 4:
        moveToSlide("intern2");
        break;
      case 5:
        moveToSlide("article");
        break;
      case 6:
        moveToSlide("website");
        break;
    };
  };

  /** Returns the string id for the given slide index
   * 
   * @param {*} index number of the slide.
   * @returns the string name for the slide.
   */
  function slideIndexToSlideName(index) {
    switch (index) {
      case 1:
        return "home";
      case 2:
        return "intern1";
      case 3:
        return "intern2";
      case 4:
        return "article";
      case 5:
        return "website";
      case 6:
        return "contact";
    };
  };

  /** Moves the slides forward by one (Slide 6 loops to Slide 1) */
  function rightClick() {
    switch (slideIndex) {
      case 1:
        moveToSlide("intern1");
        break;
      case 2:
        moveToSlide("intern2");
        break;
      case 3:
        moveToSlide("article");
        break;
      case 4:
        moveToSlide("website");
        break;
      case 5:
        moveToSlide("contact");
        break;
      case 6:
        moveToSlide("home");
        break;
    };
  };

  /**Moves the camera to a view a Vector3 location. 
   * Calculates the Vector3 location for the camera given two seperate Vector3 and a distance to the closest Vector3.
   * 
   * @param {Vector3} targetPos Vector3 repersenting the target location.
   * @param {Vector3} focalPos Vector3 repersenting the focal location for the camera. (What the camera is looking at).
   * @param {number} distFrom The distance the camera is from the target.
   */
  function move(targetPos, focalPos, distFrom) {
    // Hide all content slides before camera moves
    hideSlides();
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
      duration: 4,
      onComplete: isCameraStopped
    });

    // Animate aim of camera
    gsap.to(controls.target, {
      x: focalLoc.x,
      y: focalLoc.y,
      z: focalLoc.z,
      duration: 4
    });
  };

  /** Sets the current slide to `display: block;` ONLY if camera is not movinga
   * and sets the "blank-slide" to `display: none;` */
  function isCameraStopped() {
    if (!gsap.isTweening(camera.position)) {
      document.getElementById("blank-slide").style.display = 'none';
      document.getElementById(slideIndexToSlideName(slideIndex)).style.display = 'block';
    }
  }

  /** Change all Nav Buttons back to the unselected state */
  function resetNavColor() {
    let buttons = document.getElementsByClassName("navBarBtn"); // get all elements
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = "transparent";
    };
  };

  /** Sets all content slides to `display: none;` and sets "blank-slide" to `display: block;` */
  function hideSlides() {
    let slides = document.getElementsByClassName("slides"); // get all elements
    for (let i = 0; i < slides.length - 1; i++) {
      slides[i].style.display = "none";
    };
    document.getElementById("blank-slide").style.display = 'block';
  };

  moveToSlide("home"); //Start on the first slide
};