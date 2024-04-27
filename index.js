let playerState = "run";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", function (e) {
  playerState = e.target.value;
});
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
//the are we are drawing into
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_Height = (canvas.height = 600);
// this is the sprite sheet image
const playerImage = new Image();
playerImage.src = "/shadow_dog.png";
//the character or single animation width
const spriteWidth = 575;
const spriteHeight = 523;
//this is a counter that keeps increasing along with the animation as long as it is working
let gameFrame = 0;
//the staggerframes are like a way to slow down the animation
let staggerFrames = 5;
//this is an empty array that we are going to fill with locations of the sprite itself so that we can have multiple animations with multiple frames
//dynamically
const spriteAnimations = [];
//this is a state that we determine by having the sprite sheet .. frames are the number of the frames to each animation
const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];
//after we determine our animations now it is time to have thier locations
// we are going to loop on each animation and for each frame we are going to calc the x postion for this frame and when the animation ends or we move to other animation (index changes ) we
//are going to change the y and we will push all this to locations array to the sprite animations empty array
animationStates.forEach((state, index) => {
  let frames = { loc: [] };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});

dropdown.insertAdjacentHTML(
  "afterbegin",
  animationStates.map((animation) => `<option value=${animation.name}>${animation.name}</option>`)
);

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_Height);
  //   ctx.fillRect(100, 50, 100, 100);
  //   ctx.drawImage(playerImage,sx,sy,sw,sh,dx,dy,dw,dh) crop s then distination y
  //source x are single animation movments and source y are diffirent animations
  let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  //we are drawing the player image with first the image then the framex(the x are the distance x in  the image itself )
  //and frame y are how much y travel .. in the image itself 
  //we calc them by multiplying width in the x in locations array 
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, -10, 0, spriteWidth, spriteHeight);
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
