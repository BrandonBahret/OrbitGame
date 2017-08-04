const CANVAS_BACKGROUND = "#37474F";

var canvas;
var sketchHolder;
var game;

function setup() {
  var domElement;
  domElement = document.getElementById("sketch-holder");
  sketchHolder = new p5.Element(domElement);
  var canvasHeight = min(sketchHolder.height * 0.50, sketchHolder.width);
  canvas = createCanvas(sketchHolder.width, canvasHeight);
  canvas.parent("canvas-place");
  game = new Game();

  domElement = document.getElementById("jump-in");
  var jumpIn = new p5.Element(domElement);
  jumpIn.mousePressed(game.jumpIn);

  domElement = document.getElementById("jump-out");
  var jumpOut = new p5.Element(domElement);
  jumpOut.mousePressed(game.jumpOut);

  domElement = document.getElementById("reset");
  var reset = new p5.Element(domElement);
  reset.mousePressed(game.reset);
}

function keyPressed(){
  switch(keyCode){
    case(70): //F_KEY
      game.jumpIn();
      break;

    case(74): //J_KEY
      game.jumpOut();
      break;
  }
}

function windowResized() {
  sketchHolder = document.getElementById("sketch-holder");
  sketchHolder = new p5.Element(sketchHolder);
  var canvasHeight = min(sketchHolder.height * 0.50, sketchHolder.width);
  resizeCanvas(sketchHolder.width, canvasHeight);
}

function draw() {
  background(CANVAS_BACKGROUND);
  game.update();
  game.show();
}
