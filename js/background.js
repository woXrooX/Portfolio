'use strict';

export default class Background{
  static #selector = document.querySelector("body > background");
  static #canvas = Background.#selector.querySelector("canvas");
  static #color = getComputedStyle(document.body).getPropertyValue("--color-background");

  static{
    Background.#drawCanvas();
    Background.#onWindowResize();

  }

  static updateCanvas(){
    Background.#drawCanvas();

  }

  static #onWindowResize(){
    window.addEventListener("resize", Background.#drawCanvas);

  }

  static #drawCanvas(){
    // Get The Hash
    // On Initial Load There's No Hash Unless Navigation Class Sets Proper One.
    // So Need To Make Fallback Hash Till Valid Hash Set.
    let hash = window.location.hash.replace('#', '').toUpperCase() || "HOME";

    ////// Text
    // Set Canvas Size
    Background.#canvas.width  = window.innerWidth;
    Background.#canvas.height = window.innerHeight;

    // Get Context
    const ctx = Background.#canvas.getContext('2d');

    // Filling Background With Color
    ctx.fillStyle = Background.#color;
    ctx.fillRect(0, 0, Background.#canvas.width, Background.#canvas.height);

    // Save Current State
    // ctx.save();

    ////// Text
    // Font Size
    let fontSize = 40;

    // Text Color
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--color-middleground");

    // Font Style
    ctx.font = `${fontSize}px JosefinSans`;

    // Centering Text
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Props
    let initialX = 0;
    let initialY = 0;
    let gap = 0;
    let textWidth = ctx.measureText(hash).width;
    let moveInitialPosBy = 10;

    // y
    for(let y = initialY; y < Background.#canvas.height; y += fontSize + gap){
      // X
      for(let x = initialX; x < Background.#canvas.width; x += (textWidth + gap)){
        // Draw Text, At
        ctx.fillText(hash, x, y);

      }

    }

    // Jumps To Saved State
    // ctx.restore();

  }

}
