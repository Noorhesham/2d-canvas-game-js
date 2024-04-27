class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion=false
  }
  update(deltaTime) {
    this.x -= this.speedX;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else this.frameTimer += deltaTime;
    if(this.x+this.width<0) this.markedForDeletion=true
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
export class FlyingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 60;
    this.height = 44;
    this.x = this.game.width;
    this.y = Math.random()*this.game.height*0.5;
    this.speedX = 2;
    this.speedY=0
    this.maxFrame = 5;
    this.image = document.getElementById("enemy_fly");
  }
  update(deltaTime) {
    super.update(deltaTime);
  }
}

class Ground extends Enemy {}
class ClimbingEnemy extends Enemy {}
