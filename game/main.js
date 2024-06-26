import { Background } from "./background.js";
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from "./enemies.js";
import InpuHandler from "./input.js";
import Player from "./player.js";
import { UI } from "./ui.js";

/**@type {HTMLCanvasElement} */
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1000;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.speed = 0;
      this.maxSpeed = 3;
      this.groundMargin = 80;
      this.UI=new UI(this)
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InpuHandler(this);
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug=false
      this.score=0
      this.particles=[]
     this. fontColor='black'
     this.player.currentState = this.player.states[0];
     this.player.currentState.enter();
    }
    update(deltaTime) {
        console.log(this.particles)
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      //handle Eneimes
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else this.enemyTimer += deltaTime;
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
        if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
      });
      this.particles.forEach((particle,index)=>{
        particle.update()
        if(particle.markedForDeletion) this.particles.splice(index,1)
      })
    if(this.particles.length>200){
        this.particles=this.particles.slice(0,200)
    }
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach((enemy) => enemy.draw(context));
      this.UI.draw(context)
      this.particles.forEach((particle,index)=>{
        particle.draw(context)
      })
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
      else if(this.speed>0) this.enemies.push(new ClimbingEnemy(this))
      this.enemies.push(new FlyingEnemy(this));
    }
  }
  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});
