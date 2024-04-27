const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
const CANVAS_WIDTH2 = (canvas2.width = 800);
const CANVAS_Height2 = (canvas2.height = 700);
let gameSpeed = 15;
const backgroundLayer1 = new Image();
const backgroundLayer2 = new Image();
const backgroundLayer3 = new Image();
const backgroundLayer4 = new Image();
const backgroundLayer5 = new Image();
backgroundLayer1.src = "./layer-1.png";
backgroundLayer2.src = "./layer-2.png";
backgroundLayer3.src = "./layer-3.png";
backgroundLayer4.src = "./layer-4.png";
backgroundLayer5.src = "./layer-5.png";

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) this.x = 0;
    this.x = Math.floor(this.x - this.speed);
  }
  draw() {
    ctx2.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx2.drawImage(this.image, this.x+this.width, this.y, this.width, this.height);
  }
}
const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);
const gameObjects = [layer1, layer2, layer3, layer4, layer5];
function animate2() {
  ctx2.clearRect(0, 0, CANVAS_WIDTH2, CANVAS_Height2);
  gameObjects.forEach((obj) => {
    obj.update();
    obj.draw();
  });
  requestAnimationFrame(animate2);
}
animate2();
